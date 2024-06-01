import { 
  Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input,
} from '@repo/ui/shadcn';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/form';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { verifySessionSchema } from '../../actions';
import { z } from 'zod';
import { verifySession } from '../../actions/session/session-actions';
import { useRouter } from 'next/navigation'
import { Icons } from '@repo/ui/icons';

const JoinSessionForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const form = useForm<z.infer<typeof verifySessionSchema>>({
    resolver: zodResolver(verifySessionSchema),
    defaultValues: {
      room_id: '',
      password: ''
    },
  })

  const onJoinSession = async (formData: z.infer<typeof verifySessionSchema>) => {
    setIsLoading(true)
    console.log('hello =', formData)

    const response = await verifySession(formData.room_id)
    console.log("rs =", response)
    if(response.data?.is_verified){
      router.push('live-session/assfdddd')
    }
  }
  
  return (
    <div className='w-1/2'>
      <Card className='h-fit'>
        <CardHeader>
          <CardTitle>Join Session</CardTitle>
          <CardDescription>Enter the session id and password to join the session.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onJoinSession)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                {/* <FormField
                  control={form.control}
                  name="room_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Id</FormLabel>
                      <FormControl>
                        <InputOTP 
                          maxLength={10}
                          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                          {...field}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                            <InputOTPSlot index={6} />
                            <InputOTPSlot index={7} />
                            <InputOTPSlot index={8} />
                            <InputOTPSlot index={9} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="room_id"
                    render={({ field }) => (
                      <FormItem>
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Session Id
                            </FormLabel>
                          </div>
                        <FormControl>
                            <Input placeholder="Enter session id"  {...field} />
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
                            <Input placeholder="Enter session password"  type='password' {...field} />
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
              <Button 
                type='submit'
                className='w-full'
              >
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> }
                Join Session
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default JoinSessionForm