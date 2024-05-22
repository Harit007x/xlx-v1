'use client'
import React, { useState } from 'react'
import SessionBox from '../../../components/session-box'
import { 
  Button,
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
  ScrollArea,
  Tabs,
  TabsList,
  TabsTrigger,
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
  Label,
  Input,
} from '@repo/ui/shadcn'
import { SESSION_BOX_ITEMS } from '../../../lib/constants'
import { TSessionBoxItems } from '../../../types/types'
import { SessionForm } from '../../../components/session-form'
import { Icons } from '../../../../../packages/ui/src/icons'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

const Sessions = () => {
  const [toggleOpen, setToggleOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<TSessionBoxItems|null>(null);

  return (
    <div className='flex flex-col h-screen'>
      <main className='flex flex-col h-screen'>
        
        <div className='p-4'>
          <p className='text-2xl font-bold'>Sessions</p>
        </div>

        <div className='flex flex-col overflow-hidden gap-2'>
            <div className='flex justify-between items-center px-4 pb-4'>
              <div className='flex justify-between items-center gap-4'>
                <Tabs defaultValue="all">
                  <TabsList className="ml-auto">
                    <TabsTrigger
                      value="all"
                      className="text-zinc-600 dark:text-zinc-200"
                    >
                      All mail
                    </TabsTrigger>
                    <TabsTrigger
                      value="unread"
                      className="text-zinc-600 dark:text-zinc-200"
                    >
                      Unread
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
                className="gap-1"
                onClick={() => {
                  setToggleOpen(!toggleOpen)
                  setIsEdit(false)
                }}
              >
                <Icons.add className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Session</span>
              </Button>
            </div>
          {/* <ScrollArea className="flex-1">
            <div className='flex flex-col gap-2 p-4'>
              {
                SESSION_BOX_ITEMS.map((item: TSessionBoxItems, index: number) => {
                  return (
                    <SessionBox
                      key={index}
                      sessionName={item.sessionName}
                      scheduledDateTime={item.scheduledDateTime}
                      description={item.description}
                      tags={item.tags}
                    />
                  )
                })
              }
            </div>
          </ScrollArea> */}
          <div className='flex overflow-hidden mr-4'>
            <ScrollArea className="flex-1">
              <div className='flex flex-col gap-2 px-4 pb-4'>
                {
                  SESSION_BOX_ITEMS.map((item: TSessionBoxItems, index: number) => {
                    return (
                      <SessionBox
                        key={item.id}
                        name={item.name}
                        schedule_date_time={item.schedule_date_time}
                        description={item.description}
                        tags={item.tags}
                        onClick={()=> {
                          setSessionData(item)
                          setToggleOpen(true)
                          setIsEdit(true)
                        }}
                      />
                    )
                  })
                }
              </div>
            </ScrollArea>
            
            <div className='w-1/2'>
              <Card className='h-[21.5rem]'>
                <CardHeader>
                  <CardTitle>Join Session</CardTitle>
                  <CardDescription>Enter the session id and password to join the session.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="session-id">Session ID</Label>
                        <Input id="session-id" placeholder="Enter Session ID" />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" placeholder="Enter Password" />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="">
                  <Button className='w-full'>Join Session</Button>
                </CardFooter>
              </Card>
            </div>
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

export default Sessions