"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword } from "../actions";

import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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

function SigninForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await signInWithEmailAndPassword(values);
    const { error } = JSON.parse(result);

    if (error && error.message)
      toast({
        variant: "destructive",
        title: "Fail to Login",
        description: `${error.status}: ${error.message}`,
      });
  }

  return (
    <Card className="shadow-lg dark:shadow-lg-dark">
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
                      placeholder="Password Minimal 8 karakter!"
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
  );
}

export default SigninForm;
