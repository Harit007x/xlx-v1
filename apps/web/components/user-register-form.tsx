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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner';
import { cn } from '@repo/ui/utils';
import { userRegisterSchema } from '../actions/user/schema';
import { createUser } from '../actions/user/user-actions';
import { Icons } from '../../../packages/ui/src/icons';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(formData: z.infer<typeof userRegisterSchema>) {
    setIsLoading(true)
    const res = await createUser(formData)
    
    console.log("data =", res)

    if (!res?.error) {
      toast.success(res.message)
      router.push('/login');
    } else {
      console.log("toasted")
      toast.error(res.error, {
        action: {
          label: 'Close',
          onClick: () => console.log('Closed Toast'),
        },
      });
    }
    setIsLoading(false)

  }

  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
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
                        <div className="flex items-center gap-4 ">
                            <FormField
                              control={form.control}
                              name="first_name"
                              disabled={isLoading}
                              render={({ field }) => (
                                  <FormItem>
                                  <FormControl>
                                      <Input placeholder="First Name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                            />
                            {/* <span className="text-muted-foreground">-</span> */}
                            <FormField
                              control={form.control}
                              name="last_name"
                              disabled={isLoading}
                              render={({ field }) => (
                                  <FormItem>
                                  <FormControl>
                                      <Input placeholder="Last Name" {...field} />
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
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        disabled={isLoading}
                        render={({ field }) => (
                            <FormItem>
                            <FormControl>
                                <Input type='password' placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                      />
                </div>

                <Button className="md:right-8 md:top-8 w-full" type="submit" disabled={isLoading}>
                  {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
                  Sign-Up with Email
                </Button>
            </form>
      </Form>
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
