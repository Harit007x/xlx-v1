"use client"
import { 
    Button,
    Input,
    buttonVariants,
    Toaster
} from '@repo/ui/shadcn';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@repo/ui/form';
import * as React from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner';
import { cn } from '@repo/ui/utils';
import { userRegisterSchema } from '../actions/user/schema';
import { createUser } from '../actions/user/user-actions';
import { Icons } from './icons';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userRegisterSchema>

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(formData: z.infer<typeof userRegisterSchema>) {
    setIsLoading(true)
    const res = await createUser(formData)
    
    console.log("data =", res)

    if (!res?.error) {
      toast.success("Account created successfully")
      router.push('/login');
    } else {
      console.log("toasted")
      toast.error('Error Signing up', {
        action: {
          label: 'Close',
          onClick: () => console.log('Closed Toast'),
        },
      });
    }

  }

  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4 py-2 pb-6">
                    <div className="flex flex-col gap-2 items-start">
                        {/* <Label htmlFor="first_name">
                            Full Name
                        </Label> */}
                        <div className="flex items-center gap-2 ">
                            <FormField
                              control={form.control}
                              name="first_name"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormControl>
                                      <Input placeholder="first name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                            />
                            <span className="text-muted-foreground">-</span>
                            <FormField
                              control={form.control}
                              name="last_name"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormControl>
                                      <Input placeholder="last name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                            />
                        </div>
                    </div>
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
                                <Input type='password' placeholder="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                      />
                </div>

                <Button className="md:right-8 md:top-8 w-full" type="submit">
                  {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
                  Sign-Up with Email
                </Button>
            </form>
      </Form>
      <Toaster/>
      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div> */}
    </div>
  )
}
