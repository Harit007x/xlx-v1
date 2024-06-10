'use client'
import React, { useState } from 'react'
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
  TabsList,
  TabsTrigger,
} from '@repo/ui/shadcn'
import { TSessionBoxItems } from '../../types/types'
import SessionBox from '../session-box'
import { Icons } from '@repo/ui/icons'
import { SessionForm } from '../session-form'
import JoinSessionForm from './join-session'

interface SessionsProps {
  sessionList: TSessionBoxItems[] | undefined
}

export const SessionsClient: React.FC<SessionsProps> = ({ sessionList }) => {
  const [toggleOpen, setToggleOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const [sessionData, setSessionData] = useState<TSessionBoxItems | undefined>(undefined)

  return (
    <div className="h-screen">
      <main className="flex flex-col h-screen">
        <div className="flex gap-4 p-4">
          <p className="text-2xl font-bold">Sessions</p>
          <Button
            className="gap-1 md:hidden"
            size={'sm'}
            onClick={() => {
              setToggleOpen(!toggleOpen)
              setIsEdit(false)
            }}
          >
            <Icons.add className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="flex flex-col overflow-hidden gap-2">
          <div className="flex justify-between items-center px-4 pb-4">
            <div className="flex justify-between items-center gap-4">
              <Tabs defaultValue="all">
                <TabsList className="ml-auto">
                  <TabsTrigger value="all" className="text-zinc-600 dark:text-zinc-200">
                    Upcoming
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="text-zinc-600 dark:text-zinc-200">
                    Scheduled
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="h-10 gap-3" size="sm" variant="outline">
                    <Icons.listFilter className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button
              className="gap-1 hidden md:flex"
              onClick={() => {
                setToggleOpen(!toggleOpen)
                setIsEdit(false)
              }}
            >
              <Icons.add className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Session</span>
            </Button>
          </div>

          <div className="flex overflow-hidden md:mr-4">
            <div className="flex flex-1 overflow-hidden">
              <ScrollArea className="flex-1">
                <div className="flex flex-col gap-2 px-4 pb-4 min-w-[22rem]">
                  {sessionList?.map((item: TSessionBoxItems) => (
                    <SessionBox
                      key={item.id}
                      name={item.name}
                      schedule_date_time={item.schedule_date_time}
                      description={item.description}
                      tags={item.tags}
                      invitation_link={item.invitation_link}
                      onClick={() => {
                        setSessionData(item)
                        setToggleOpen(true)
                        setIsEdit(true)
                      }}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
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
  )
}
