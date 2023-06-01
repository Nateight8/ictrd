import React from "react";

// import { StarFilledIcon } from "@radix-ui/react-icons";
import { Button } from "components/ui/button";

function GuestUser() {
  return (
    <div
      className="flex min-h-screen  w-full flex-col justify-center p-4"
      style={{
        backgroundImage:
          "linear-gradient(to left bottom, #4c1472, #32175d, #1e1546, #100e2f, #020018)",
      }}
    >
      <div className="mx-auto h-20 w-full max-w-7xl">
        <div className="space-y-3">
          <h1 className="font-creatosBold text-5xl font-bold">
            Invest & Earn <br />
            <span className="text-secondary">Crypto Instantly</span>
          </h1>
          <p className="max-w-prose text-base">
            Join world&rsquo;s fastest & most optimised trading application in
            the world.
          </p>
          <div className="my-6 grid max-w-md grid-cols-3 gap-4">
            <Button variant="secondary" className="w-full">
              Get Started
            </Button>
            <div className="col-span-full col-start-2 flex items-center">
              {/* <StarFilledIcon className="ml-4" /> Trusted by over 2,500 Traders */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestUser;
