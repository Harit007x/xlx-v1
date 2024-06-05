'use client'
import { Icons } from '@repo/ui/icons'
import { Button } from '@repo/ui/shadcn'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner';
import clsx from 'clsx'

const ControlDock = () => {
  const router = useRouter()
  const [pollDisabled, setPollDisabled] = useState(false);
  const [messageDisabled, setMessageDisabled] = useState(false);
  const [qnaDisabled, setQnaDisabled] = useState(false);

  const handleExit = () => {
    router.push('/sessions')
    toast.success('Exited from session')
  }

  return (
    <div className='flex justify-center w-full h-fit mt-4'>
        <div className='flex gap-4 w-fit rounded-full bg-gray-100 dark:bg-gray-900 outline outline-2 outline-foreground/10 p-2'>
            <Button 
              size={'icon'}
              className={clsx(
                'rounded-full bg-gray-200 dark:bg-gray-800 hover:dark:bg-foreground/10 hover:bg-foreground/10 text-foreground outline outline-2 outline-foreground/10',
                {
                  'dark:bg-red-600 hover:dark:bg-red-600 bg-red-600 hover:bg-red-600 text-white': pollDisabled
                }
              )}
              onClick={() => setPollDisabled(!pollDisabled)}
            >
              {pollDisabled ? <Icons.barChart2 className='h-5 w-5'/> : <Icons.barChart2 className='h-5 w-5'/>}
            </Button>
            <Button 
              size={'icon'}
              className={clsx(
                'rounded-full bg-gray-200 dark:bg-gray-800 hover:dark:bg-foreground/10 hover:bg-foreground/10 text-foreground outline outline-2 outline-foreground/10',
                {
                  'dark:bg-red-600 hover:dark:bg-red-600 bg-red-600 hover:bg-red-600 text-white': messageDisabled
                }
              )}
              onClick={() => setMessageDisabled(!messageDisabled)}
            >
              {messageDisabled ? <Icons.messageCircleOff className='h-5 w-5'/> : <Icons.messageCircle className='h-5 w-5'/>}
            </Button>
            <Button 
              size={'icon'}
              className={clsx(
                'rounded-full bg-gray-200 dark:bg-gray-800 hover:dark:bg-foreground/10 hover:bg-foreground/10 text-foreground outline outline-2 outline-foreground/10',
                {
                  'dark:bg-red-600 hover:dark:bg-red-600 bg-red-600 hover:bg-red-600 text-white': qnaDisabled
                }
              )}
              onClick={() => setQnaDisabled(!qnaDisabled)}
            >
              {qnaDisabled ? <Icons.messageSquareOff className='h-5 w-5'/> : <Icons.messageSquareQuote className='h-5 w-5'/>}
            </Button>
            <Button
              size={'icon'}
              className='rounded-full bg-red-600 hover:bg-red-700 text-white outline outline-2 outline-foreground/10'
              onClick={() => handleExit()}
            >
              <Icons.phone className='h-5 w-5 rotate-[135deg]'/>
            </Button>
        </div>
    </div>
  )
}

export default ControlDock