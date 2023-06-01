// import { DataTable } from "./components/DataTable";
import { api } from "~/utils/api";
import Transact from "./components/Transact";
import Layout from "./components/layout";
import { DataTable } from "components/payment/data-table";
import { columns } from "components/payment/columns";
// import { Payment, columns } from "./components/colum";

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//       date: "24",
//     },
//   ];
// }

export default function Payment() {
  const transactns = api.transaction.getAllTransaction.useQuery();

  // console.log(transactns);
  //   const data = await getData();
  const data = transactns.data;
  console.log(data);

  return (
    <Layout>
      <Transact />
      <div className="py-10">
        {data && <DataTable columns={columns} data={data} />}
      </div>
    </Layout>
  );
}
