'use client';
import {
  Button,
  Input,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuContent,
} from '@repo/ui/shadcn';
import { Icons } from '@repo/ui/icons';
import { useRecoilValue } from 'recoil';
import { useEffect, useRef, useState } from 'react';
import { userAtom } from '@repo/store';
import { GetSessionQuestions, SessionQuestionsSchema } from '../../actions';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@repo/ui/form';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { useSocket } from '../../app/socketContext';
import { getSessionQuestions } from '../../actions/session/session-actions';
// import clsx from 'clsx'

interface IQuestionsContainerProps {
  room_id: string
  questions: GetSessionQuestions
}

const QuestionsContainer = (props: IQuestionsContainerProps) => {
  const user = useRecoilValue(userAtom);
  const { socket } = useSocket();
  const [scrollDown, setScrollDown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inbox, setInbox] = useState<SessionQuestionsSchema[] | undefined>(props.questions.data);
  const inboxDivRef = useRef<HTMLDivElement>(null);
  const form = useForm({
    defaultValues: {
      question: '',
    },
  });

  useEffect(() => {
    if (socket) {
      socket.on('question', (question) => {
        console.log('Received question:', question);
        setScrollDown((prev) => !prev);
        setInbox((inbox: any) => [...inbox, question]);
      });

      socket.on('question-action', (question) => {
        console.log('question action:', question);
        setScrollDown((prev) => !prev);
        setInbox((inbox: any) => {
          const updatedInbox = inbox.map((q: any) => (q.id === question.id ? question : q));
          updatedInbox.sort((a: any, b: any) => {
            return b.up_vote_count - a.up_vote_count;
          });
          return updatedInbox;
        });
      });
    }

    // socket.on('question-action', async (question) => {
    //   console.log('question action:', question)
    //   setScrollDown((prev) => !prev)
    //   const updated_questions = await getSessionQuestions(props.room_id, 10, inbox?.length)
    //   setInbox(updated_questions.)
    // })

    return () => {
      if (socket) {
        socket.off('question');
        socket.off('question-action');
      }
    };
  }, [socket]);

  console.log('update or not =', inbox);

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
      if (inbox?.length !== props.questions.count) {
        const previousScrollHeight = inboxDivRef.current?.scrollHeight || 0;
        const result = await getSessionQuestions(props.room_id, 10, inbox?.length);
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

  const handleAskQuestion = async (formData: any) => {
    setIsLoading(true);
    console.log('formda =', formData);
    if (formData.question !== '') {
      if (socket) {
        // console.log("Sending question:", formData.question);
        socket.emit('question', formData.question, props.room_id, user?.user_id);
      }
      form.reset({
        question: '',
      });
    }
    setIsLoading(false);
  };

  const handleActions = async (
    question_id: number,
    user_id: number,
    up_vote: boolean,
    down_vote: boolean
    // up_vote_count: number
  ) => {
    if (socket) {
      socket.emit('question-action', props.room_id, question_id, user_id, up_vote, down_vote);
    }
  };

  return (
    <div className="flex h-[88vh] min-w-[30vw] flex-col border border-foreground/10 rounded-md">
      <header className="flex h-14 items-center justify-between border-b border-foreground/10 px-6 py-4 dark:border-gray-800">
        <h2 className="text-lg font-medium">Q&A</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline">
              <Icons.listFilter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup value="upvotes">
              <DropdownMenuRadioItem value="upvotes">Sort by Upvotes</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="downvotes">Sort by Downvotes</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="flex-1 overflow-auto px-6 py-4" ref={inboxDivRef}>
        <div className="space-y-4">
          {inbox?.map((question: SessionQuestionsSchema) => {
            return (
              <div
                key={question.id}
                className="flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800"
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">{question.question}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    <span>@{question.user_name}</span> • {format(new Date(question.created_at), 'hh:mm a')}
                  </p>
                </div>
                <div className="flex items-center gap-2 mr-2">
                  {question.is_disabled || question.user_id === user?.user_id ? (
                    <>
                      <span className="text-xs font-medium p-[12px] relative rounded-full bg-background border border-foreground/10 flex items-center justify-center">
                        <span className="absolute text-blue">{question.up_vote_count}</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full h-7 w-7 bg-background border border-foreground/10"
                        disabled={question.is_disabled}
                        onClick={() => handleActions(question.id, question.user_id, true, false)}
                      >
                        <Icons.ChevronUp className="h-4 w-4" />
                      </Button>
                      {/* <Button
                        className={clsx(
                          'rounded-full h-5 w-5 bg-transparent hover:bg-transparent border border-green text-green px-0 py-0',
                          {
                            'bg-green hover:bg-green text-white cursor-default': question.is_answered,
                          }
                        )}
                        disabled={question.is_disabled}
                        onClick={() =>
                          handleActions(question.id, question.user_id, true, false, question.up_vote_count + 1)
                        }
                      >
                        <Icons.check className="h-4 w-4" />
                      </Button> */}
                      <span className="text-xs font-medium">{question.up_vote_count}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full h-7 w-7 bg-background border border-foreground/10"
                        disabled={question.is_disabled}
                        onClick={() => handleActions(question.id, question.user_id, false, true)}
                      >
                        <Icons.chevronDown className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t border-foreground/10 p-4 dark:border-gray-800">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAskQuestion)}>
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="Ask your question..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="flex gap-2" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Ask
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default QuestionsContainer;
