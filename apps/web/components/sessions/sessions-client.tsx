'use client';
import React, { useState } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/shadcn';
import { TSessionBoxItems } from '../../types/types';
import SessionBox from '../session-box';
import { Icons } from '@repo/ui/icons';
import { SessionForm } from '../session-form';
import JoinSessionForm from './join-session';

interface SessionsProps {
  sessionList: TSessionBoxItems[] | undefined
}

export const SessionsClient: React.FC<SessionsProps> = ({ sessionList }) => {
  const [toggleOpen, setToggleOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [sessionData, setSessionData] = useState<TSessionBoxItems | undefined>(undefined);

  return (
    <div className="h-screen">
      <main className="flex flex-col h-screen">
        <div className="flex gap-4 p-4">
          <p className="text-2xl font-bold">Sessions</p>
          <Button
            className="gap-1 md:hidden"
            size={'sm'}
            onClick={() => {
              setToggleOpen(!toggleOpen);
              setIsEdit(false);
            }}
          >
            <Icons.add className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex overflow-hidden">
          <Tabs defaultValue="upcoming" className='h-full flex flex-1 flex-col gap-2'>
            <div className='px-4'>
              
            <TabsList className="self-start">
              <TabsTrigger value="upcoming" className="text-zinc-600 dark:text-zinc-200">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="finished" className="text-zinc-600 dark:text-zinc-200">
                Finished
              </TabsTrigger>
            </TabsList>
            </div>
            <TabsContent value='upcoming' className='flex-1 overflow-hidden'>
              <ScrollArea className="h-full px-4">
                <div className="flex flex-col gap-2 min-w-[22rem]">
                  <SessionBox
                    sessionList={sessionList?.filter((item) => !item.is_finished)}
                    setSessionData={setSessionData}
                    setToggleOpen={setToggleOpen}
                    setIsEdit={setIsEdit}
                  />
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent value='finished' className='flex-1 overflow-hidden'>
              <ScrollArea className="h-full px-4">
                <div className="flex flex-col gap-2 min-w-[22rem]">
                  <SessionBox
                    sessionList={sessionList?.filter((item) => item.is_finished)}
                    setSessionData={setSessionData}
                    setToggleOpen={setToggleOpen}
                    setIsEdit={setIsEdit}
                  />
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
          <div className='smd:flex flex-1 flex-col items-end gap-4 hidden pr-4'>
            <Button
              className="gap-1 hidden md:flex"
              onClick={() => {
                setToggleOpen(!toggleOpen);
                setIsEdit(false);
              }}
            >
              <Icons.add className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Session</span>
            </Button>
            <JoinSessionForm />
          </div>
        </div>
      </main>
      <SessionForm
        toggleOpen={toggleOpen}
        setToggleOpen={setToggleOpen}
        sessionData={sessionData}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
};
