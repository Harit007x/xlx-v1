"use client"
import { 
    Button,
    Input,
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
    Textarea,
    Switch,
    ScrollArea,
    Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
    SheetClose,
} from '@repo/ui/shadcn';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/form';
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useRouter } from 'next/navigation'
import { cn } from '@repo/ui/utils';
import { sessionSchema } from '../actions/session/schema';

interface ISessionFormProps{
  toggleOpen: boolean,
  setToggleOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function SessionForm(props: ISessionFormProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(formData: z.infer<typeof sessionSchema>) {
    
    console.log("data =", formData)

    // if (!res?.error) {
    //   toast.success(res.message)
    //   router.push('/login');
    // } else {
    //   console.log("toasted")
    //   toast.error(res.error, {
    //     action: {
    //       label: 'Close',
    //       onClick: () => console.log('Closed Toast'),
    //     },
    //   });
    // }
    setIsLoading(false)

  }

  const form = useForm<z.infer<typeof sessionSchema>>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      name: "",
      description: "",
      schedule_date_time: "",
      tags: [],
      is_auto: false,
      password: '',
    },
  })

  return (
        <ScrollArea>
    <Sheet open={props.toggleOpen} onOpenChange={props.setToggleOpen}>
      <SheetContent className='p-0 xl:w-[700px] xl:max-w-none sm:w-[400px] sm:max-w-[540px]' onOpenAutoFocus={(e:any) => e.preventDefault()}>
          <Card className="w-full border-none p-0 m-0">
            <CardHeader>
              <CardTitle>Schedule Session</CardTitle>
              <CardDescription>Schedule a session by filling required details below.</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Session Name
                              </FormLabel>
                            </div>
                          <FormControl>
                              <Input placeholder="name" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                          <FormItem>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Session Description
                              </FormLabel>
                            </div>
                          <FormControl>
                              <Textarea placeholder="description" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="schedule_date_time"
                      render={({ field }) => (
                          <FormItem>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Scheduled Date Time
                              </FormLabel>
                            </div>
                          <FormControl>
                              <Input placeholder="schedule_date_time" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                  </div>
                  {/* <div className="flex flex-col space-y-1.5 ">
                    <Label htmlFor="session-id" className='text-md'>Invitation Link</Label>
                    <div className='flex gap-4 items-center'>
                      <Input disabled placeholder="invitation_link" />
                      <CopyButton textToCopy={"linkToCopy"} />
                    </div>
                  </div> */}
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                          <FormItem>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Session Tags
                              </FormLabel>
                            </div>
                          <FormControl>
                              <Input placeholder="tags" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="is_auto"
                      render={({ field }) => (
                        <FormItem>
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Auto Start
                            </FormLabel>
                            <FormDescription>
                              If enabled, the session will automatically start at the scheduled time.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                          <FormItem>
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Session Password
                              </FormLabel>
                            </div>
                          <FormControl>
                              <Input placeholder="password" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                  </div>
                </div>
              </form>
            </Form>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <SheetClose asChild>
                <Button variant={'ghost'} className='w-fit'>Discard</Button>
              </SheetClose>
              <Button className='w-fit'>Schedule</Button>
            </CardFooter>
          </Card>
      </SheetContent>
    </Sheet>
    </ScrollArea>
  )
}
