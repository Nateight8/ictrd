import { ColumnDef } from "@tanstack/react-table";
// import { DateTimeFormatOptions } from '@formatjs/intl';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  // id: string;
  amount: number;
  status: string;
  plan: string | null;
  transactionDate: Date;
  paymentReference: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "transactionDate",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("transactionDate");

      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      };

      const formattedDate = (date as Date).toLocaleDateString(
        undefined,
        options
      );

      console.log("Formatted date:", formattedDate);

      return <div className=" font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "paymentReference",
    header: "Reference",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
