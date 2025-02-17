import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

import React from "react";
import { HandMetal } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-zinc-100 py-2 bottom-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <HandMetal />
        </Link>
        <Link href="/signin" className={buttonVariants()}>
          SignIn
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
