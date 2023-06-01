import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  plan: string;
  transactionDate: string;
  paymentReference: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },

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

      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };

      const formattedDate = date.toLocaleDateString(undefined, options);

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
