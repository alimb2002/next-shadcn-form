"use client";

import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const UserProfile = () => {
  return (
    <Button onClick={() => signOut()} variant="destructive">
      Sign out
    </Button>
  );
};

export default UserProfile;
