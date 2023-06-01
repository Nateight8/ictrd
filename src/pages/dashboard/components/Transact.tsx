import React, { useEffect, useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePaystackPayment } from "react-paystack";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "components/ui/sheet";
import { Button, buttonVariants } from "components/ui/button";
import { Input } from "components/ui/input";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  //   amount: z.number().min(50, "Minimum deposit amount is 50"),
  amount: z.string().min(2, {
    message: "minimum deposit is $50",
  }),
  plan: z.string({
    required_error: "please select an investment plan",
  }),
});

function Transact() {
  return (
    <div>
      <div className="flex justify-end space-x-2">
        <Button size="sm" variant="outline">
          Withdrawal
        </Button>
        <Deposit />
      </div>
    </div>
  );
}

export default Transact;

const Deposit = () => {
  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      plan: "",
    },
  });

  const { data: sessionData } = useSession();
  const email = sessionData?.user.email;
  const name = sessionData?.user.name;
  const [config, setconfig] = useState({
    reference: new Date().getTime().toString(),
    email: "johndoe@gmail.com",
    amount: 0,
    publicKey: "pk_test_a137d402b5975716e89952a898aad2832c961d69",
    plan: "",
  });

  const [successful, setSuccessful] = useState(false);
  const transactionMutation = api.transaction.createTransaction.useMutation();
  const transactns = api.transaction.getAllTransaction.useQuery();

  const onSuccess = () => {
    setSuccessful(true);
  };

  const initializePayment = usePaystackPayment(config);

  // get date format

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    setconfig({
      reference: new Date().getTime().toString(),
      email: "johndoe@gmail.com",
      amount: parseInt(values.amount),
      publicKey: "pk_test_a137d402b5975716e89952a898aad2832c961d69",
      plan: values.plan,
    });
    initializePayment(onSuccess);

    try {
      await transactionMutation.mutateAsync({
        amount: config.amount,
        plan: config.plan,
        ref: config.reference,
        status: "success",
        date: new Date(),
      });

      await transactns.refetch();

      console.log("Transaction successful");
    } catch (error) {
      console.error("Transaction mutation failed:", error);
    }

    form.reset();
    setStep(1);
  }

  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((e) => e + 1);
  };

  useEffect(() => {
    setconfig((prevConfig) => ({
      ...prevConfig,
      amount: parseInt(form.watch("amount")) || 0,
    }));
  }, [form.watch("amount")]);

  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm">Deposit</Button>
        </SheetTrigger>
        <SheetContent position="bottom" size="lg">
          <SheetHeader>
            <SheetTitle>Fund and Trade</SheetTitle>
            <SheetDescription>
              Enter the amount you want to start your investment journey with
            </SheetDescription>
          </SheetHeader>

          <div className="my-4 w-full max-w-md">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {step === 1 && (
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter an Amount</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter amount" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {step === 2 && (
                  <FormField
                    control={form.control}
                    name="plan"
                    render={({ field }: any) => (
                      <FormItem>
                        <FormLabel>Choose a plan</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="three">Three months</SelectItem>
                            <SelectItem value="six">Six Months</SelectItem>
                            <SelectItem value="nine">Nine Months</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {step <= 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={nextStep}
                      className={buttonVariants({ className: "w-full" })}
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <>
                    <Button className="w-full" type="submit">
                      Submit
                    </Button>
                  </>
                )}
                <div className="flex justify-center space-x-3">
                  {[1, 2].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setStep(item);
                      }}
                      className={`h-2 w-2  rounded-full ${
                        step === item
                          ? "bg-secondary ring-2 ring-offset-4 ring-offset-background"
                          : "ring-none bg-input"
                      } `}
                    />
                  ))}
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
