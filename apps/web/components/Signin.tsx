'use client';
import { 
    Button,
    Input,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@repo/ui/shadcn';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import Link from "next/link";

const Signin = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState: any) => !prevState);
  }
  const router = useRouter();
  const email = useRef('');
  const password = useRef('');

  const formSchema = z.object({
    username: z.string()
        .min(1, 'Username is required')
        .min(4, 'Username must be at least 4 characters')
        .max(10),
    password: z.string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters').max(10),
  });

  const onLoginSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("valeus = ", values)
    const res = await signIn('credentials', {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    if (!res?.error) {
      router.push('/');
    } else {
      toast('Error Signing in', {
        action: {
          label: 'Close',
          onClick: () => console.log('Closed Toast'),
        },
      });
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden relative h-full w-full bg-muted lg:flex">
          {/* <img
              className="absolute inset-0 m-auto self-center object-cover h-full w-full"
              src={Dots}
              alt="Dots"
          /> */}
          <img
              className="absolute inset-0 m-auto self-center object-cover h-full w-full"
              // src={Glitch}
              alt="Dots"
          />
          <img
              className="z-[1] m-auto h-[66%]"
              // src={Origin}
              alt="Origin"
          />
      </div>
      <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                  {/* <Icons.logo className="mx-auto h-6 w-6" /> */}
                  <h1 className="text-2xl font-semibold tracking-tight">
                  Welcome back
                  </h1>
                  <p className="text-sm text-muted-foreground">
                  Enter your email to sign in to your account
                  </p>
              </div>
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onLoginSubmit)}>
                      <div className="flex flex-col gap-4 py-2 pb-6">
                          <FormField
                              control={form.control}
                              name="username"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormControl>
                                      <Input placeholder="username" {...field} />
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
                                  <FormControl>
                                      <Input type="password" placeholder="password" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </div>
                      <Button className="md:right-8 md:top-8 w-full" type="submit">Sign In</Button>
                  </form>
              </Form>
              <Link href="/sign-up">
                  <p className="px-8 text-center text-sm text-muted-foreground">
                      <span
                          // onClick={props.handleSwitchForm}
                          className="cursor-pointer hover:text-brand hover:underline underline-offset-2"
                      >
                          Don&apos;t have an account? Sign Up
                      </span>
                  </p>
              </Link>
          </div>
      </div>
  </div>
  );
};

export default Signin;
