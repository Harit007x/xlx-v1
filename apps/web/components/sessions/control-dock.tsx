'use client';
import { Icons } from '@repo/ui/icons';
import { Button, Input, Label } from '@repo/ui/shadcn';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import clsx from 'clsx';
import CurrentTime from '../current-time';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../../packages/ui/src/shadcn/ui/dialog';
import { CopyButton } from '@repo/ui/copy-button';
import { useMeetingSession } from '@repo/store';

interface ControlDockProps {
}

const ControlDock = (props: ControlDockProps) => {
  const router = useRouter();
  const [pollDisabled, setPollDisabled] = useState(false);
  const [messageDisabled, setMessageDisabled] = useState(false);
  const [qnaDisabled, setQnaDisabled] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [meetingSession] = useMeetingSession()
  console.log('asdasd',meetingSession)

  const handleExit = () => {
    router.push('/sessions');
    toast.success('Exited from session');
  };

  return (
    <div className="flex relative justify-center w-full h-fit mt-4 items-center">
      <span className='flex text-md absolute left-6'>
        <CurrentTime/>
        &nbsp;
        |
        &nbsp;
        {meetingSession?.meeting_id}
      </span>
      <div className="flex gap-4 w-fit rounded-full bg-gray-100 dark:bg-gray-900 outline outline-2 outline-foreground/10 p-2">
        <Button
          size={'icon'}
          className={clsx(
            'rounded-full bg-gray-200 dark:bg-gray-800 hover:dark:bg-foreground/10 hover:bg-foreground/10 text-foreground outline outline-2 outline-foreground/10',
            {
              'dark:bg-red-600 hover:dark:bg-red-600 bg-red-600 hover:bg-red-600 text-white': pollDisabled,
            }
          )}
          onClick={() => setPollDisabled(!pollDisabled)}
        >
          {pollDisabled ? <Icons.barChart2 className="h-5 w-5" /> : <Icons.barChart2 className="h-5 w-5" />}
        </Button>
        <Button
          size={'icon'}
          className={clsx(
            'rounded-full bg-gray-200 dark:bg-gray-800 hover:dark:bg-foreground/10 hover:bg-foreground/10 text-foreground outline outline-2 outline-foreground/10',
            {
              'dark:bg-red-600 hover:dark:bg-red-600 bg-red-600 hover:bg-red-600 text-white': messageDisabled,
            }
          )}
          onClick={() => setMessageDisabled(!messageDisabled)}
        >
          {messageDisabled ? (
            <Icons.messageCircleOff className="h-5 w-5" />
          ) : (
            <Icons.messageCircle className="h-5 w-5" />
          )}
        </Button>
        <Button
          size={'icon'}
          className={clsx(
            'rounded-full bg-gray-200 dark:bg-gray-800 hover:dark:bg-foreground/10 hover:bg-foreground/10 text-foreground outline outline-2 outline-foreground/10',
            {
              'dark:bg-red-600 hover:dark:bg-red-600 bg-red-600 hover:bg-red-600 text-white': qnaDisabled,
            }
          )}
          onClick={() => setQnaDisabled(!qnaDisabled)}
        >
          {qnaDisabled ? (
            <Icons.messageSquareOff className="h-5 w-5" />
          ) : (
            <Icons.messageSquareQuote className="h-5 w-5" />
          )}
        </Button>
        <Button
          size={'icon'}
          className="rounded-full bg-red-600 hover:bg-red-700 text-white outline outline-2 outline-foreground/10"
          onClick={() => handleExit()}
        >
          <Icons.phone className="h-5 w-5 rotate-[135deg]" />
        </Button>
      </div>
     

      <Dialog>
        <DialogTrigger asChild>
        <Button
          size={'icon'}
          className={clsx(
            'absolute right-4 rounded-full bg-gray-200 bg-transparent hover:dark:bg-transparent text-foreground outline outline-2 outline-foreground/10',
          )}
          onClick={() => setIsMore(!isMore)}
        >
          <Icons.ellipsis className="h-6 w-6" />
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Invite people to join</DialogTitle>
            <DialogDescription>
              Manage and send meeting invitations.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-1 gap-2">
              <div className='flex flex-col flex-1 gap-2'>
                <Label htmlFor="link">
                  Meeting ID
                </Label>
                <Input
                  id="link"
                  defaultValue={meetingSession?.meeting_id}
                  readOnly
                />
              </div>
              {/* <CopyButton className="self-end" toastMessage={'Meeting ID copied'} textToCopy={'sdjs'} /> */}
            </div>
            <div className="flex flex-1 gap-2">
              <div className='flex flex-col flex-1 gap-2'>
                <Label htmlFor="link">
                  Pass code
                </Label>
                <Input
                  id="link"
                  defaultValue={meetingSession?.password}
                  readOnly
                />
              </div>
              {/* <CopyButton className="self-end" toastMessage={'Meeting ID copied'} textToCopy={'sdjs'} /> */}
            </div>
          
          </div>
          <DialogFooter>
            <CopyButton 
              className="self-end"
              type='text'
              toastMessage={'Meeting URL copied'}
              textToCopy={meetingSession?.invitation_link}
              beforeCopyText="Copy URL"
              afterCopyText="Copied!"  
            />
            <Button type="button" className='w-full' variant={'outline'}>Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ControlDock;
