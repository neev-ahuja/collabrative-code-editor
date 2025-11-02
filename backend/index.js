const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");

// Server Setup
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Generate Code Logic
function generateCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Store active rooms and their state
const rooms = {}; 

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  //  Create room
  socket.on("create-room", (data) => {
    let code = generateCode();
    while (rooms[code]) code = generateCode(); // ensure unique

    rooms[code] = {
      users: [{ name: data.name, socketId: socket.id }],
      data: "",
    };

    socket.join(code); 
    socket.emit("room-created", { code, ...rooms[code] });

    console.log(`Room ${code} created by ${data.name}`);
  });

  // Join room
  socket.on("join-room", (data) => {
    const { code, name } = data;

    if (!rooms[code]) {
      socket.emit("error", { message: "Room not found" });
      return;
    }

    rooms[code].users.push({ name, socketId: socket.id });
    socket.join(code);

    socket.emit("joined-room", { code, ...rooms[code] });
    socket.to(code).emit("update", rooms[code] );

    console.log(`${name} joined room ${code}`);
  });

  // Code updates (collaboration sync)
  socket.on("update", (data) => {
    const { code, content } = data;

    if (!rooms[code]) return;

    rooms[code].data = content;
    socket.to(code).emit("update", rooms[code]);
  });



  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    for (const code in rooms) {
      const room = rooms[code];
      room.users = room.users.filter((u) => u.socketId !== socket.id);
      if (room.users.length === 0) delete rooms[code];
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
