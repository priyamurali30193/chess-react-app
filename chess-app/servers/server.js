const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend to connect
    methods: ["GET", "POST"],
  },
});

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// WebSocket connection
io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`📌 User joined room: ${room}`);
  });

  socket.on("move", ({ from, to, fen, room }) => {
    console.log(`♟️ Move received: ${from} → ${to} in Room: ${room}`);
    io.to(room).emit("move", { fen });
  });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
