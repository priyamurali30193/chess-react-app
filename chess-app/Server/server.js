const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

const playerRoutes = require("./models/playerRoutes"); // Ensure this file exists!

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//rooms
const rooms = {}; // Store room states

io.on("connection", (socket) => {
  console.log("🔥 A user connected");

  // 🏠 Join a room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`✅ Player joined room: ${roomId}`);

    if (!rooms[roomId]) {
      rooms[roomId] = { gameFEN: null }; // Store game state
    }
  });

  // ♟️ Handle moves
  socket.on("move", ({ from, to, fen, room }) => {
    console.log(`♟️ Move in ${room}: ${from} → ${to}`);
  
    if (!rooms[room]) {
      rooms[room] = { gameFEN: fen };
    }
  
    socket.to(room).emit("move", { from, to, fen }); // ✅ Send move & FEN state
  });
  
  socket.on("disconnect", () => {
    console.log("❌ A user disconnected");
  });
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
const MONGO_URI = "mongodb+srv://priyamurali30193:prajesh2108@cluster0.udhfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ API Routes
app.use("/api/players", playerRoutes);

// ✅ Default Route (Fixes 404 Error)
app.get("/", (req, res) => {
  res.send("✅ Chess Server is Running!");
});

// ✅ Socket.io Logic


io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`Player ${socket.id} joined room: ${roomId}`);
    
    // Broadcast to other players in the room
    io.to(roomId).emit("updatePlayers", roomId);
  });

  socket.on("move", ({ room, from, to,fen }) => {
    console.log(`Move received in room ${room}: ${from} -> ${to}`);
    socket.to(room).emit("move", { from, to , fen});
  });

  socket.on("disconnect", () => {
    console.log("Player disconnected:", socket.id);
  });
});


// ✅ Start Server
const PORT = 8080;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
