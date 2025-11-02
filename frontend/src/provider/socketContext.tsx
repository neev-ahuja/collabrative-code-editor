import React, { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import { useSelector, useDispatch } from 'react-redux'
import { update } from "../redux/slices/code";
import {update as updateRoom} from "../redux/slices/data";
import { Users } from "lucide-react";

// Define socket event types (optional)
interface ServerToClientEvents {
  receive_message: (data: string) => void;
  "room-created": (data: { code: string ; users: any[] ; data: string  }) => void;
  "code-updated": (data: { content: string }) => void;
  "joined-room": (data: {code : string; users: any[] ; data: string }) => void;
  "update": (data: { users: any[] ; data: string }) => void;
}

interface ClientToServerEvents {
  send_message: (data: string) => void;
}

// Context type
type SocketContextType = Socket<ServerToClientEvents, ClientToServerEvents> | null;

// Create the context
const SocketContext = createContext<SocketContextType>(null);

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<SocketContextType>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_APP_BACKEND_URL, {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect" , () => {
      console.log("Connected to server with ID:", socket.id);
    });

    socket.on("room-created" , (data) => {
      dispatch(update(data.code));
      dispatch(updateRoom({users : data.users , data : data.data}));
    });
    socket.on("joined-room" , (data) => {
      dispatch(update(data.code));
      dispatch(updateRoom({users : data.users , data : data.data}));
    })
    socket.on("update" , (data) => {
      dispatch(updateRoom(data));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    }); 
} , [socket]);

return (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);
}
