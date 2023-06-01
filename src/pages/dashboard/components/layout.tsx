import DashboardNav from "components/navbar/Dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-7xl px-4">
      <DashboardNav />
      {children}
    </main>
  );
}
