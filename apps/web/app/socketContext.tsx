'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider: React.FC<{ meeting_id: string; children: React.ReactNode }> = ({
  meeting_id,
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  console.log('socket =', meeting_id);
  useEffect(() => {
    const socketInstance = io('https://xlx-v1.onrender.com', {
      transports: ['websocket'], // Ensure WebSocket is used
    });
    socketInstance.on('connect', () => {
      socketInstance.emit('joinRoom', meeting_id);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [meeting_id]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
