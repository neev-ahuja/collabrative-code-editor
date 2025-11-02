import React, { useState } from "react";
import { Plus, LogIn, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../provider/socketContext";
import type { Socket } from "socket.io-client";

interface ClientToServerEvents {
  "send_message": (data: any) => void;
  "create-room": (data: { name: string }) => void;
  "join-room": (data: { code: string; name: string }) => void;
}


const StartCoding = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [formData, setFormData] = useState({
    name: "",
    roomId: "",
  });
  const navigate = useNavigate();
  const socket = useSocket() as unknown as Socket<any, ClientToServerEvents>;
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (activeTab === "create") {
      socket.emit("create-room", { name: formData.name });
      navigate(`/editor`);
    } else {
      if (!formData.roomId.trim()) {
        alert("Please enter a valid room ID.");
        return;
      }
      socket.emit("join-room", { code: formData.roomId, name: formData.name });
      navigate(`/editor`);
    }
  };
  
  

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white flex items-center justify-center px-4 py-8">
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex border-b border-gray-700/50">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "create"
                  ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-b-2 border-indigo-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/30"
              }`}
            >
              <Plus className="w-5 h-5" />
              Create Room
            </button>
            <button
              onClick={() => setActiveTab("join")}
              className={`flex-1 py-4 px-6 font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === "join"
                  ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-b-2 border-indigo-500 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700/30"
              }`}
            >
              <LogIn className="w-5 h-5" />
              Join Room
            </button>
          </div>

          <div className="p-8">
            {activeTab === "create" ? (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
                    <Plus className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Create New Room</h3>
                  <p className="text-sm text-gray-400">
                    Start a new collaborative coding session
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-white"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  Create Room
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
                    <Users className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Join Existing Room</h3>
                  <p className="text-sm text-gray-400">
                    Enter the room code to collaborate
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Room Code
                  </label>
                  <input
                    type="text"
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleInputChange}
                    placeholder="Enter room code"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300 text-white font-mono"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
                >
                  Join Room
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartCoding;
