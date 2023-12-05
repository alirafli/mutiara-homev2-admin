"use client";

import React, { useEffect, useState } from "react";
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

import { ImageWrapper, SigninWrapper } from "./styles";
import { ModeToggle } from "@/components/toggle-theme";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";

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
  const { theme } = useTheme();
  const [themes, setTheme] = useState<string | null>(null);
  const [logo, setLogo] = useState<string>("/logo.png");

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

  useEffect(() => {
    if (theme) {
      setTheme(theme);
    }

    if (theme === "dark") {
      setLogo("/logo_white.png");
    } else {
      setLogo("/logo.png");
    }
  }, [theme]);

  return (
    <SigninWrapper mode={themes}>
      <title>Sign In</title>
      <ModeToggle />
      <ImageWrapper>
        <Image
          src={logo}
          width={200}
          height={200}
          layout="responsive"
          alt="mutiara home logo"
          priority
        />
      </ImageWrapper>

      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-3xl">
        Halaman Admin
      </h1>

      <Card>
        <div>
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
                        placeholder="Password harus diatas 8 huruf!"
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
        </div>
      </Card>
    </SigninWrapper>
  );
}

export default Signin;
