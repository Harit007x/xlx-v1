'use client'
import { Icons } from "@repo/ui/icons";
import { Avatar, AvatarFallback, AvatarImage, Button, DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger, Input } from "@repo/ui/shadcn";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface ILiveSessionClientProps{
  room_id: string
}

const LiveSessionClient = (props: ILiveSessionClientProps) => {

  const [socket, setSocket] = useState<any>(undefined);
  const [inbox, setInbox] = useState<any>([])
  const [message, setMessage] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(()=>{
    const socket = io('http://localhost:8000')

    socket.on('message', (message, room)=>{
      console.log("recieved mesage", message)
      setInbox((inbox:any)=> [...inbox, message])
    })

    setSocket(socket)

    return () => {socket.close()}
  },[])

  const handleSendMessage = () => {
    if(socket){
      socket.emit("message", message, roomName)
    }
  }

  const handleRoomName = () => {
    if(socket){
      socket.emit("joinRoom", roomName)
    }
  }
  const { theme, setTheme } = useTheme()
  
  return (
    <main className="p-4 h-[100vh] flex flex-col justify-between overflow-y-auto">
      <div className="flex-1 gap-2">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 flex h-[88vh] flex-col border border-foreground/10 rounded-md">
            <header className="flex h-14 items-center justify-between border-b border-foreground/10 px-6 dark:border-gray-800">
              <h2 className="text-lg font-medium">Chat</h2>
              <Button size="icon" variant="ghost">
                <Icons.trophy className="h-5 w-5" />
                <span className="sr-only">Leader Board</span>
              </Button>
            </header>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {inbox.map((message:any, idx:any)=>{
                  return(
                    <p key={idx}>
                      {message}
                    </p>
                  )
                })}
                <div className="flex items-start gap-3 justify-end">
                  <div className="flex flex-col gap-1">
                    <div className="text-sm self-end"><span>10:00AM</span></div>
                    <div className="rounded-lg text-sm text-white font-medium bg-blue-500 p-4 dark:bg-blue-500">
                      <p className="">Hey everyone, how's it going?</p>
                    </div>
                  </div>
                  {/* <Avatar className="h-10 w-10">
                    <AvatarImage alt="@user2" src="/placeholder-avatar.jpg" />
                    <AvatarFallback>ME</AvatarFallback>
                  </Avatar> */}
                </div>
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage alt="@user2" />
                    <AvatarFallback>U2</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm">Ron-Shanks • <span>10:00AM</span></div>
                    <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                      <p className="text-sm font-medium">Hey everyone, how's it going?</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-foreground/10 p-4 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <Input 
                  className="flex-1"
                  placeholder="Type your message..."
                  type="text"
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button 
                  type="button"
                  className="flex gap-2"
                  onClick={() => {handleSendMessage()}}
                >
                  Send <Icons.send className="h-5 w-5"/>
                </Button>
              </div>
            </div>
          </div>
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
            <div className="flex-1 overflow-auto px-6 py-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium">How do I set up my development environment?</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="text-foreground">@Ron-Shanks</span> • 10:00AM
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="rounded-full h-7 w-7 bg-background border border-foreground/10">
                      <Icons.ChevronUp className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">12</span>
                    <Button size="icon" variant="ghost" className="rounded-full h-7 w-7 bg-background border border-foreground/10">
                      <Icons.chevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
                  <div className="space-y-1">
                    <h3 className="text-base font-medium">What is the recommended deployment strategy?</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      I'd like to know the best way to deploy my application.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="rounded-full h-7 w-7 bg-background border border-foreground/10">
                      <Icons.ChevronUp className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium">8</span>
                    <Button size="icon" variant="ghost" className="rounded-full h-7 w-7 bg-background border border-foreground/10">
                      <Icons.chevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-foreground/10 p-4 dark:border-gray-800">
              <form>
                <div className="flex items-center gap-4">
                  <Input className="flex-1" placeholder="Type your message..." type="text" />
                  <Button 
                    type="submit"
                    className="flex gap-2"
                  >
                    Ask <Icons.send className="h-5 w-5"/>
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full h-fit mt-4">
        <div className="flex gap-3 w-fit rounded-full bg-gray-100 dark:bg-gray-800 outline outline-2 outline-foreground/10 p-2">
          <Button size={'icon'} className="rounded-full bg-background text-foreground outline outline-2 outline-foreground/10">
            <Icons.barChart2 className="h-5 w-5"/>
          </Button>
          <Button size={'icon'} className="rounded-full bg-background text-foreground outline outline-2 outline-foreground/10">
            <Icons.messageCircleMore className="h-5 w-5"/>
          </Button>
          <Button size={'icon'} className="rounded-full bg-background text-foreground outline outline-2 outline-foreground/10">
            <Icons.messageCircleQuestion className="h-5 w-5"/>
          </Button>
          <Button size={'icon'} className="rounded-full bg-red-600 text-white outline outline-2 outline-foreground/10">
            <Icons.logout className="h-5 w-5"/>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default LiveSessionClient