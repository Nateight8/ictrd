import React from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "components/ui/tabs";

function DashboardNav() {
  return (
    <div className="w-full py-4">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">
            <Link href="/dashboard">Overview</Link>
          </TabsTrigger>
          <TabsTrigger value="account">
            <Link href="/dashboard/account">Account</Link>
          </TabsTrigger>
          <TabsTrigger value="payment">
            <Link href="/dashboard/payment">Payment</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

export default DashboardNav;
