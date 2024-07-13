'use client';
import { Icons } from '@repo/ui/icons';
import { Avatar, AvatarFallback, AvatarImage, Button, Input } from '@repo/ui/shadcn';
import { useEffect, useRef, useState } from 'react';
import { userAtom } from '@repo/store';
import { useRecoilValue } from 'recoil';
import { GetSessionMessages, SessionMessagesSchema } from '../../actions';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@repo/ui/form';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { getSessionMessages } from '../../actions/session/session-actions';
import { useSocket } from '../../app/socketContext';

interface IChatContainerProps {
  meeting_id: string
  messages: GetSessionMessages
}

export const ChatContainer = (props: IChatContainerProps) => {
  const user = useRecoilValue(userAtom);
  const { socket } = useSocket();
  const [scrollDown, setScrollDown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inbox, setInbox] = useState<SessionMessagesSchema[] | undefined>(props.messages.data);
  const inboxDivRef = useRef<HTMLDivElement>(null);
  const form = useForm({
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    if (socket) {
      socket.on('message', (message) => {
        console.log('Received message:', message);
        setScrollDown((prev) => !prev);
        setInbox((inbox: any) => [...inbox, message]);
      });
    }
  }, [socket]);
console.log("inbox = ",inbox);
  useEffect(() => {
    requestAnimationFrame(() => {
      if (inboxDivRef.current) {
        console.log('not called');
        inboxDivRef.current.scrollTop = inboxDivRef.current.scrollHeight;
      }
    });
  }, [scrollDown]);

  const fetchOlderMessages = async () => {
    try {
      if (inbox?.length !== props.messages.count) {
        const previousScrollHeight = inboxDivRef.current?.scrollHeight || 0;
        const result = await getSessionMessages(props.meeting_id, 10, inbox?.length);
        // console.log('messages fetched =', result.data)
        if (result.error) {
          console.error(result.error);
        } else {
          setInbox((prevInbox) => {
            // @ts-ignore
            const newInbox = [...result.data, ...prevInbox];
            requestAnimationFrame(() => {
              if (inboxDivRef.current) {
                inboxDivRef.current.scrollTop = inboxDivRef.current.scrollHeight - previousScrollHeight;
              }
            });
            return newInbox;
          });
        }
      }
    } catch (err) {
      console.error('Failed to fetch older messages', err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (inboxDivRef.current && inboxDivRef.current.scrollTop === 0) {
        fetchOlderMessages();
      }
    };

    if (inboxDivRef.current) {
      inboxDivRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (inboxDivRef.current) {
        inboxDivRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [fetchOlderMessages]);

  const handleSendMessage = async (formData: any) => {
    setIsLoading(true);
    if (formData.message !== '') {
      if (socket) {
        // console.log("Sending message:", formData.message);
        socket.emit('message', formData.message, props.meeting_id, user?.user_id);
      }
      form.reset({
        message: '',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="lg:col-span-2 flex h-[88vh] flex-col border border-foreground/10 rounded-md">
      <header className="flex h-14 items-center justify-between border-b border-foreground/10 px-6 dark:border-gray-800">
        <h2 className="text-lg font-medium">Chat</h2>
        <Button size="icon" variant="ghost">
          <Icons.trophy className="h-5 w-5" />
          <span className="sr-only">Leader Board</span>
        </Button>
      </header>
      <div className="flex-1 overflow-y-auto p-4" ref={inboxDivRef}>
        <div className="space-y-4">
          {inbox?.map((message: SessionMessagesSchema) => (
            <div key={message.id}>
              {message.user_id === user?.user_id ? (
                <div className="flex items-start gap-3 justify-end">
                  <div className="flex flex-col gap-1">
                    <div className="text-xs self-end">
                      <span>{format(new Date(message.created_at), 'hh:mm a')}</span>
                    </div>
                    <div className="rounded-lg text-sm text-white font-medium bg-blue-500 p-4 dark:bg-blue-500">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt="@user2" />
                    <AvatarFallback>{message.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <div className="text-xs">
                      {message.user_name} • <span>{format(new Date(message.created_at), 'hh:mm a')}</span>
                    </div>
                    <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                      <p className="text-sm font-medium">{message.message}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-foreground/10 p-4 dark:border-gray-800">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSendMessage)}>
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Type your message..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="flex gap-2" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Send
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChatContainer;
