'use client'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Page(): JSX.Element {
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



  return (
    <div>
      {inbox.map((message:any, idx:any)=>{
        return(
          <p key={idx}>
            {message}
          </p>
        )
      })}
      
      message
      <input 
        style={{backgroundColor:'gray'}}
        type="text"
        name="message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => {handleSendMessage()}}>
        Send
      </button>
      <br/>

      roomname
      <input 
        style={{backgroundColor:'gray'}}
        type="text"
        name="room" 
        onChange={(e) => setRoomName(e.target.value)}
      />

      <button onClick={() => {handleRoomName()}}>
        jOIN ROOM
      </button>
    </div>
  );
}
