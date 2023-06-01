import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import AuthCase from "../authcase/AuthCase";
import { buttonVariants } from "components/ui/button";
import Link from "next/link";

export default function Example() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <div className="mb-4 mt-2 flex  flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link
        href="/"
        className={buttonVariants({ variant: "link", size: "sm" })}
      >
        Pages
      </Link>
      <Link
        href="/"
        className={buttonVariants({ variant: "link", size: "sm" })}
      >
        Account
      </Link>
      <Link
        href="/"
        className={buttonVariants({ variant: "link", size: "sm" })}
      >
        Block
      </Link>

      <Link
        href="/"
        className={buttonVariants({ variant: "link", size: "sm" })}
      >
        Doc
      </Link>
    </div>
  );

  const mobileNavList = (
    <div className="mb-4 mt-2 flex w-full flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Link
        href="/"
        className={buttonVariants({
          variant: "leftAlignBtn",
          size: "sm",
          className: "w-full",
        })}
      >
        Pages
      </Link>
      <Link
        href="/"
        className={buttonVariants({
          variant: "leftAlignBtn",
          size: "sm",
          className: "w-full",
        })}
      >
        Account
      </Link>
      <Link
        href="/"
        className={buttonVariants({
          variant: "leftAlignBtn",
          size: "sm",
          className: "w-full",
        })}
      >
        Block
      </Link>

      <Link
        href="/"
        className={buttonVariants({
          variant: "leftAlignBtn",
          size: "sm",
          className: "w-full",
        })}
      >
        Doc
      </Link>
    </div>
  );

  return (
    <div className="w-full ">
      <nav className="fixed left-0 right-0 top-0 z-10 mx-auto w-full  rounded-none border-none bg-background px-4 py-2 shadow-none md:h-max lg:px-8 lg:py-4">
        <div>
          <div className="text-slate-200 mx-auto flex w-full max-w-7xl items-center justify-between">
            <Typography
              as="a"
              href="#"
              className="mr-4 cursor-pointer py-1.5 font-medium"
            >
              IconicTrade
            </Typography>
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <AuthCase />
              </div>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <MobileNav open={openNav}>
            <div className="flex h-[100svh] flex-col justify-between">
              {navList}
              <AuthCase />
            </div>
          </MobileNav>
        </div>
      </nav>
    </div>
  );
}
