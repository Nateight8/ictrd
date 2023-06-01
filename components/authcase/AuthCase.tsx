import { Button, buttonVariants } from "components/ui/button";
import { signIn, useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";

const AuthCase = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex w-full items-center space-x-10 md:w-fit">
        {session ? (
          <ProfileMenu />
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={async () => await signIn("google")}
            >
              Sign in
            </Button>

            <Link
              href="/register"
              className={buttonVariants({ variant: "secondary" })}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default AuthCase;

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button>
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        <MenuItem>
          <Button size="sm" className="w-full" onClick={() => signOut()}>
            Sign out
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
