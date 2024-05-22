"use client"
import { 
    Button,
    Input,
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
    Textarea,
    Switch,
    ScrollArea,
    Sheet, SheetContent, SheetClose,
    Popover,
    Calendar,
    PopoverTrigger,
    PopoverContent,
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
import { useForm,Controller } from "react-hook-form"
import * as z from "zod"
import { sessionSchema } from '../actions/session/schema';
import { TSessionBoxItems } from '../types/types';
import { useEffect, useState } from 'react';
import { createSession } from '../actions/session/session-actions';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../../packages/store/src/atoms/user';
import { Icons } from '@repo/ui/icons';
import { cn } from '@repo/ui/utils';
import { format } from 'date-fns';
import { TimePickerDemo } from '@repo/ui/date-time-picker';
import { MultipleSelector } from '@repo/ui/multi-select';

interface ISessionFormProps{
  toggleOpen: boolean
  setToggleOpen: React.Dispatch<React.SetStateAction<boolean>>
  sessionData: TSessionBoxItems | null
  isEdit : boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export function SessionForm(props: ISessionFormProps) {
  const user = useRecoilValue(userAtom)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModified, setIsModified] = useState<boolean>(false);

  async function onSubmit(formData: z.infer<typeof sessionSchema>) {
    setIsLoading(true)
    console.log("data =", formData)
    
    const res = await createSession(formData, 2)

    console.log("res =", res)
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
    props.setToggleOpen(false)
    setIsLoading(false)
  }
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const form = useForm<z.infer<typeof sessionSchema>>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      name: "",
      description: "",
      schedule_date_time: undefined,
      is_auto: false,
      password: '',
      tags: []
    },
  })

  useEffect(() => {
    console.log("called re")
    if (props.sessionData) {
      form.reset(props.sessionData);
      setIsModified(false);
    }
  }, [props.sessionData]);

  useEffect(() => {
    console.log("toggled")
    if (!props.toggleOpen || !props.isEdit) {
      console.log("nahi hua calls")
      form.reset({
        name: "",
        description: "",
        schedule_date_time: undefined,
        is_auto: false,
        password: '',
        tags: []
      });
    }
  }, [props.toggleOpen]);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      setIsModified(true);
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
      <Sheet open={props.toggleOpen} onOpenChange={props.setToggleOpen}>
        <SheetContent className='p-0 xl:w-[700px] xl:max-w-none md:w-[500px] sm:w-[400px] sm:max-w-[540px]' onOpenAutoFocus={(e:any) => e.preventDefault()}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
            <ScrollArea>

              <Card className="w-full border-none p-0 m-0 h-screen">
                <CardHeader>
                  <CardTitle>
                    {props.isEdit ? 'Edit Session Details' : 'Schedule Session'}
                  </CardTitle>
                  <CardDescription>
                    {
                      props.isEdit
                      ?
                        'Edit the session details by saving changes.'
                      :
                        'Schedule a session by filling required details below.'
                    }
                  </CardDescription>
                </CardHeader>
                  <CardContent>
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
                                  <Input placeholder="Name" {...field} />
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
                                  <Textarea placeholder="Description" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                        />
                      </div>
                      {/* <div className="flex flex-col space-y-1.5">
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
                                  <Input placeholder="Date Time" {...field} />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                        />
                      </div> */}
                      <div className="flex flex-col w-full">
                        
                      <FormField
                          control={form.control}
                          name="schedule_date_time"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel className="text-left">DateTime</FormLabel>
                              <Popover>
                                <FormControl>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      <Icons.calender className="mr-2 h-4 w-4" />
                                      {field.value ? (
                                        format(field.value, "PPP HH:mm:ss")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                </FormControl>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                  <div className="p-3 border-t border-border">
                                    <TimePickerDemo
                                      setDate={field.onChange}
                                      date={field.value}
                                    />
                                  </div>
                                </PopoverContent>
                              </Popover>
                            </FormItem>
                          )}
                        />

                        {/* <FormField
                          control={form.control}
                          name="schedule_date_time"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="schedule_date_time">Schedule_date Time</FormLabel>
                              <FormControl>
                                <DateTimePicker
                                  granularity="second"
                                  jsDate={field.value}
                                  onJsDateChange={field.onChange}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        /> */}
                      </div>
                      <div className="flex flex-col space-y-1.5">
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Schedule Date Time</FormLabel>
                            <FormControl>
                              <MultipleSelector
                                {...field}
                                creatable
                                defaultOptions={options}
                                placeholder="Select schedule date & time"
                                emptyIndicator={
                                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                    no results found.
                                  </p>
                                }
                              />
                            </FormControl>
                            <FormMessage />
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
                                  <Input placeholder="Password" {...field} />
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
                    </div>
                  </CardContent>
                <CardFooter className="flex justify-end gap-4">
                  {props.isEdit == false && (
                    <>
                      <SheetClose asChild>
                        <Button variant={'ghost'} className='w-fit'>Cancel</Button>
                      </SheetClose>
                      <Button 
                        className="md:right-8 md:top-8 w-fit"
                        type='submit'
                      >
                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
                        Schedule
                      </Button>
                    </>
                  )}
                  {(isModified && props.isEdit) && (
                    <>
                      <SheetClose asChild>
                        <Button 
                          variant={'ghost'}
                          className="md:right-8 md:top-8 w-fit"
                        >
                          Discard
                        </Button>
                      </SheetClose>
                      <Button 
                        className="md:right-8 md:top-8 w-fit"
                        type='submit'
                      >
                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
                        Save
                      </Button>
                    </>
                  )}
                </CardFooter>

              </Card>
                </ScrollArea>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
  )
}
