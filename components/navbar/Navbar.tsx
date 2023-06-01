"use client";
import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { signIn } from "next-auth/react";

function Navigation() {
  const links = [
    {
      id: "s",
      url: "/",
      label: "Home",
    },
    {
      id: "c",
      url: "/dashboard",
      label: "Dashboard",
    },
    {
      id: "a",
      url: "/",
      label: "About",
    },
    {
      id: "ac",
      url: "/",
      label: "FAQ",
    },
  ];
  return (
    <div className="sticky left-0 top-0 z-50 w-full bg-transparent p-4">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="">
          <p className="text-lg">
            <span className="font-creatosBold">iconic</span>trade
          </p>
        </div>
        <ul className="flex">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.url}
                className={buttonVariants({
                  variant: "link",
                  className: "text-lg",
                })}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-center space-x-10">
          <li>
            {/* <Link
              className={buttonVariants({
                variant: "ghost",
              })}
              href="/sign-in"
            >
              Sign in
            </Link> */}
            <Button onClick={async () => await signIn("google")}>
              Sign in
            </Button>
          </li>
          <li>
            <Link
              href="/register"
              className={buttonVariants({ variant: "secondary" })}
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
