'use client'
import { buttonVariants } from '@repo/ui/shadcn'
import { cn } from '@repo/ui/utils'
import Link from 'next/link'

// Not using this page, but after deleting it, it throws an error 404 not found for not found page it self.

export default function Temp() {
  return (
    <main>
      <h1>Home Page</h1>
      <Link href="/login" className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'px-4')}>
        Login
      </Link>
      {/* {inbox.map((message:any, idx:any)=>{
        return(
          <p key={idx}>
            {message}
          </p>
        )
      })}
      
      message
      <input 
        className="bg-blue-400"
        // style={{backgroundColor:'gray'}}
        type="text"
        name="message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <Button onClick={() => {handleSendMessage()}}>
        Send
      </Button>
      <br/>

      roomname
      <input 
        style={{backgroundColor:'gray'}}
        type="text"
        name="room" 
        onChange={(e) => setRoomName(e.target.value)}
      />

      <Button
        onClick={()=> handleRoomName()}
      >
        jOIN ROOM
      </Button> */}
    </main>
  )
}
