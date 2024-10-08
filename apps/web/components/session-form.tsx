'use client';
import {
  Button,
  Input,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Textarea,
  Switch,
  Sheet,
  SheetContent,
  SheetClose,
  Popover,
  Calendar,
  PopoverTrigger,
  PopoverContent,
} from '@repo/ui/shadcn';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { sessionSchema } from '../actions/session/schema';
import { TSessionBoxItems } from '../types/types';
import { useEffect, useState } from 'react';
import { createSession, updateSession } from '../actions/session/session-actions';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@repo/store';
import { Icons } from '@repo/ui/icons';
import { cn } from '@repo/ui/utils';
import { format } from 'date-fns';
import { TimePickerDemo } from '@repo/ui/date-time-picker';
import { MultipleSelector } from '@repo/ui/multi-select';
import { CopyButton } from '@repo/ui/copy-button';

interface ISessionFormProps {
  toggleOpen: boolean
  setToggleOpen: React.Dispatch<React.SetStateAction<boolean>>
  sessionData: TSessionBoxItems | undefined
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export function SessionForm(props: ISessionFormProps) {
  const user: any = useRecoilValue(userAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModified, setIsModified] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<number | undefined>(undefined);
  const onSubmit = async (formData: z.infer<typeof sessionSchema>) => {
    setIsLoading(true);
    if (props.isEdit) {
      const res = await updateSession(formData, sessionId, user.user_id);
      console.log('update res =', res);
    } else {
      const res = await createSession(formData, user.user_id);
      console.log('submit res =', res);
    }

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
    props.setToggleOpen(false);
    setIsLoading(false);
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const form = useForm<z.infer<typeof sessionSchema>>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      name: '',
      description: '',
      schedule_date_time: undefined,
      is_auto: false,
      password: '',
      tags: [],
    },
  });

  useEffect(() => {
    if (props.sessionData && props.isEdit && props.toggleOpen) {
      console.log('set form ');
      form.reset(props.sessionData);
      setIsModified(false);
      setSessionId(props.sessionData?.id);
    }
    if (!props.toggleOpen || !props.isEdit) {
      console.log('unset form');
      form.reset({
        name: '',
        description: '',
        schedule_date_time: undefined,
        is_auto: false,
        password: '',
        tags: [],
      });
    }
  }, [props.sessionData, props.toggleOpen]);

  useEffect(() => {
    const subscription = form.watch(() => {
      setIsModified(true);
    });

    return () => subscription.unsubscribe();
  }, [form.watch]);

  return (
    <Sheet open={props.toggleOpen} onOpenChange={props.setToggleOpen}>
      <SheetContent
        className="p-0 xl:w-[700px] xl:max-w-none md:w-[500px] sm:w-[400px] sm:max-w-[540px]"
        onOpenAutoFocus={(e: any) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='overflow-y-auto	'>
              <Card className="w-full border-none p-0 m-0 h-screen">
                <CardHeader>
                  <CardTitle>{props.isEdit ? 'Edit Session Details' : 'Schedule Session'}</CardTitle>
                  <CardDescription>
                    {props.isEdit
                      ? 'Edit the session details by saving changes.'
                      : 'Schedule a session by filling required details below.'}
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
                              <FormLabel>Session Name</FormLabel>
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
                              <FormLabel>Session Description</FormLabel>
                            </div>
                            <FormControl>
                              <Textarea placeholder="Description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex flex-col w-full">
                      <FormField
                        control={form.control}
                        name="schedule_date_time"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-left">Schedule Date Time</FormLabel>
                            <Popover>
                              <FormControl>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      'w-full justify-start text-left font-normal',
                                      !field.value && 'text-muted-foreground'
                                    )}
                                  >
                                    <Icons.calender className="mr-2 h-4 w-4" />
                                    {field.value ? format(field.value, 'PPP HH:mm:ss') : <span>Pick a date</span>}
                                  </Button>
                                </PopoverTrigger>
                              </FormControl>
                              <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                <div className="p-3 border-t border-border">
                                  <TimePickerDemo setDate={field.onChange} date={field.value} />
                                </div>
                              </PopoverContent>
                            </Popover>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                              <MultipleSelector
                                {...field}
                                creatable
                                defaultOptions={options}
                                placeholder="Select or create custom tags"
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
                    {props.isEdit && (
                      <>
                         <div className="flex gap-3 space-y-1.5">
                            <FormField
                              control={form.control}
                              name="meeting_id"
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <div className="space-y-0.5">
                                    <FormLabel>Meeting ID</FormLabel>
                                  </div>
                                  <FormControl>
                                    <Input placeholder="meeting_id" readOnly {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <CopyButton className="self-end" toastMessage={'ID copied'} textToCopy={props.sessionData?.meeting_id} />
                          </div>
                          <div className="flex gap-3 space-y-1.5">
                            <FormField
                              control={form.control}
                              name="invitation_link"
                              render={({ field }) => (
                                <FormItem className="w-full">
                                  <div className="space-y-0.5">
                                    <FormLabel>Invitation Link</FormLabel>
                                  </div>
                                  <FormControl>
                                    <Input placeholder="invitation_link" readOnly {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <CopyButton className="self-end" toastMessage={'Link copied'} textToCopy={props.sessionData?.invitation_link} />
                          </div>
                      </>
                    )}
                    {props.isEdit && (
                        <div className="flex gap-3 space-y-1.5">
                          <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <div className="space-y-0.5">
                                  <FormLabel>Pass Code</FormLabel>
                                </div>
                                <FormControl>
                                  <Input placeholder="Password" readOnly {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <CopyButton className="self-end" toastMessage={'Passcode copied'} textToCopy={props.sessionData?.password} />
                        </div>
                      )
                    }
                    <FormField
                      control={form.control}
                      name="is_auto"
                      render={({ field }) => (
                        <FormItem>
                          <div className="space-y-0.5">
                            <FormLabel>Auto Start</FormLabel>
                            <FormDescription>
                              If enabled, the session will automatically start at the scheduled time.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-4">
                  {props.isEdit === false && (
                    <>
                      <SheetClose asChild>
                        <Button variant={'ghost'} className="w-fit">
                          Cancel
                        </Button>
                      </SheetClose>
                      <Button className="md:right-8 md:top-8 w-fit" type="submit">
                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                        Schedule
                      </Button>
                    </>
                  )}
                  {isModified && props.isEdit && (
                    <>
                      <SheetClose asChild>
                        <Button variant={'ghost'} className="md:right-8 md:top-8 w-fit">
                          Discard
                        </Button>
                      </SheetClose>
                      <Button className="md:right-8 md:top-8 w-fit" type="submit">
                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                        Save
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
