"use client"
import { 
    Button,
    Input,
    Toaster,
    buttonVariants
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
import { userLoginSchema } from '../actions/user/schema';
import { Icons } from './icons';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userLoginSchema>

export function UserLoginForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()

  async function onSubmit(values: z.infer<typeof userLoginSchema>) {
    setIsLoading(true)
    const res = await signIn('credentials', {
      username: values.username,
      password: values.password,
      redirect: false,
    });
      
    console.log("form res =",res)
      
    if (!res?.error) {
      router.push('/');
    } else {
      console.log("toasted")
      toast.error('Error Signing in', {
        action: {
          label: 'Close',
          onClick: () => console.log('Closed Toast'),
        },
      });
    }
  }

  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
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
                <Button className="md:right-8 md:top-8 w-full" type="submit">
                  {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
                  Sign In
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
