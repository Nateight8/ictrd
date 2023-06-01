import AuthUser from "components/users/auth-user/AuthUser";
import GuestUser from "components/users/guest/GuestUser";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return <main className="">{session ? <AuthUser /> : <GuestUser />}</main>;
}
