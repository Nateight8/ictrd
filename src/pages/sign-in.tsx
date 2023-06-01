"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IconButton, Input } from "@material-tailwind/react";
import { EyeIcon } from "lucide-react";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import {
  FormField,
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Label } from "components/ui/label";
import { Button } from "components/ui/button";
const formSchema = z
  .object({
    email: z.string().min(1),
    password: z.string().min(1),
    confirmPass: z.string().min(1),
  })
  .superRefine(({ confirmPass, password }, ctx) => {
    if (confirmPass !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export default function SignIn({}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPass: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="w-full bg-[#1c1443]">
      <div className="relative  mx-auto flex h-screen w-full max-w-7xl flex-col justify-center  p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full max-w-md flex-col justify-center space-y-8 "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input variant="standard" label="E-mail" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      variant="standard"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <IconButton
                    onClick={handleClickShowPassword}
                    variant="text"
                    size="sm"
                    className="!absolute bottom-0 right-0 rounded"
                  >
                    {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
                  </IconButton>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="my-8 flex items-center space-x-4">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Remember me for 30 days</Label>
            </div>
            <Button type="submit" className="w-full">
              Sign me in
            </Button>
          </form>
        </Form>
        <div className="my-8">
          <span className="my-3">
            Don&rsquo;t have an account?{" "}
            <Link className="text-secondary" href="/register">
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
