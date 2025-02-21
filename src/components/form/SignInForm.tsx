"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { signInFormSchema } from "@/types/schema";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof signInFormSchema>) {
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });

    if (signInData?.error) {
      // toast({
      //   title: "Error",
      //   description: "oops something went wrong",
      // });
      console.log(signInData.error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="py-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-2">
          Sign In
        </Button>
      </form>
      <div
        className="mx-auto my-4 flex w-full items-center justify-evenly 
        before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 
        after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400"
      >
        or
      </div>

      <p className="text-center text-sm text-gray-600 mt-2">
        If you don not have an account please.
        <Link className="text-blue-500 hover:underline" href="/signup">
          Sign Up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;
