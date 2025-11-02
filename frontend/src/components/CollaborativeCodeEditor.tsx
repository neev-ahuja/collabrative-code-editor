import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, Users, Copy, Check, LogOut, Circle } from "lucide-react";
import { useSocket } from "../provider/socketContext";
import type { Socket } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { update } from '../redux/slices/data';
interface ClientToServerEvents {
  "update": (data: { code: string | undefined; content: string }) => void;
  "leave-room": (data: { code: string | undefined }) => void;
}

const CollaborativeCodeEditor = () => {
  const roomId = useSelector((state: any) => state.code);
  const code = useSelector((state: any) => state.data.data);
  const dispath = useDispatch();
  const users: any[] = useSelector((state: any) => state.data.users);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const socket = useSocket() as unknown as Socket<any, ClientToServerEvents>;

  const textareaRef = useRef<any>(null);

  useEffect(() => {
    if (!roomId) {
      navigate("/");
    }
  }, [roomId]);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const leaveRoom = () => {
    if (window.confirm("Are you sure you want to leave this room?")) {
      socket.emit("leave-room", { code: roomId });
      window.location.href = "/";
    }
  };
  

  const handleCodeChange = (e: any) => {
    dispath(update({ users: users, data: e.target.value }));
    socket.emit("update", { code: roomId, content: e.target.value });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white">
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Code2 className="w-8 h-8 text-indigo-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              CodeSync
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-400">Room:</span>
              <code className="text-indigo-400 font-mono font-semibold">
                {roomId}
              </code>
              <button
                onClick={copyRoomCode}
                className="ml-2 p-1 hover:bg-gray-700/50 rounded"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
            <button
              onClick={leaveRoom}
              className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Leave
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto p-4 flex gap-4 h-[calc(100vh-80px)]">
        {/* Editor Section */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex-1 bg-gray-900/50 border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={handleCodeChange}
              // onKeyDown={handleKeyDown}
              className="w-full h-full p-6 bg-transparent text-white font-mono text-sm leading-relaxed resize-none focus:outline-none"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Users Panel */}
        <div className="w-80 bg-gray-900/50 border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl">
          <div className="px-6 py-4 bg-gray-800/50 border-b border-gray-700/50">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-indigo-400" />
              <h3 className="font-semibold">Active Users ({users.length})</h3>
            </div>
          </div>
          <div className="p-4 space-y-2 overflow-y-auto">
            {users.map((u, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-700/30 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                  {u.name ? u.name[0].toUpperCase() : "?"}
                </div>
                <div>
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-gray-400">Active</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollaborativeCodeEditor;
