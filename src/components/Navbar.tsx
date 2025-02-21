import React from "react";
import Link from "next/link";
import { HandMetal } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserProfile from "./UserProfile";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-zinc-100 py-2 border-b border-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-black">
          <HandMetal />
        </Link>
        <section className="flex gap-2 items-center font-medium text-blue-600">
          <Link href="/dashboard/admin">Admin</Link>
          {session?.user ? (
            <UserProfile />
          ) : (
            <Link href="/signin" className={buttonVariants()}>
              SignIn
            </Link>
          )}
        </section>
      </div>
    </div>
  );
};

export default Navbar;
