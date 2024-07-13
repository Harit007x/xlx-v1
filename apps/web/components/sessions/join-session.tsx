import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input } from '@repo/ui/shadcn';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifySessionSchema } from '../../actions';
import { z } from 'zod';
import { verifySession } from '../../actions/session/session-actions';
import { useRouter } from 'next/navigation';
import { Icons } from '@repo/ui/icons';
import { toast } from 'sonner';
import { sessionAtom } from '@repo/store';
import { useSetRecoilState } from 'recoil';

const JoinSessionForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setMeetingSession = useSetRecoilState(sessionAtom);

  const form = useForm<z.infer<typeof verifySessionSchema>>({
    resolver: zodResolver(verifySessionSchema),
    defaultValues: {
      meeting_id: '',
      password: '',
    },
  });

  const onJoinSession = async (formData: z.infer<typeof verifySessionSchema>) => {
    setIsLoading(true);
    console.log('hello =', formData);
    const response = await verifySession(formData.meeting_id, formData.password);
    console.log('rs =', response);
    if (response.data?.id) {
      setMeetingSession(response.data);
      router.push(`live-session/${response.data.meeting_id}`);
    } else {
      setIsLoading(false);
      toast.error(response.error);
    }
  };

  return (
    <div className="min-w-[20rem] w-full">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className='text-xl'>Join Session</CardTitle>
          <CardDescription>Enter the session id and password to join the session.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onJoinSession)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="meeting_id"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-0.5">
                          <FormLabel>Session Id</FormLabel>
                        </div>
                        <FormControl>
                          <Input placeholder="Enter session id" disabled={isLoading} {...field} />
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
                          <FormLabel>Session Password</FormLabel>
                        </div>
                        <FormControl>
                          <Input placeholder="Enter session password" disabled={isLoading} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {/* <Button 
                type='submit'
                className='w-full'
              >
                Join Session
              </Button> */}
            </CardContent>
            <CardFooter className="">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Join Session
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default JoinSessionForm;
