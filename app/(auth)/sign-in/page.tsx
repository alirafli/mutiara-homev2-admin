"use client";

import React from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

import { FormStyle, SigninWrapper } from "./styles";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email wajib di isi!" })
    .min(1, { message: "Email wajib di isi!" })
    .email("Email tidak valid."),
  password: z
    .string({ required_error: "Password wajib di isi!" })
    .min(8, { message: "Password harus lebih dari 8 karakter!" })
    .max(50),
});

function Signin() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: remove clg sign in onSubmit later
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // eslint-disable-next-line no-console
    console.log(values);
  }
  return (
    <SigninWrapper>
      <title>Sign In</title>

      <Image
        src="/logo.png"
        width={200}
        height={200}
        alt="mutiara home logo"
        priority
      />
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl">
        Halaman Admin
      </h1>

      <FormStyle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      type="email"
                      {...field}
                    />
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
                    <Input
                      placeholder="type your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Masuk</Button>
          </form>
        </Form>
      </FormStyle>
    </SigninWrapper>
  );
}

export default Signin;
