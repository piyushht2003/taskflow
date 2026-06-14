import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("join-project", (projectId) => {
    socket.join(projectId);
    console.log(`Socket ${socket.id} joined project: ${projectId}`);
  });

  socket.on("leave-project", (projectId) => {
    socket.leave(projectId);
    console.log(`Socket ${socket.id} left project: ${projectId}`);
  });

  socket.on("task-moved", (data) => {
    // Broadcast the task movement to everyone else in the project room
    socket.to(data.projectId).emit("task-moved", data);
  });

  socket.on("task-updated", (projectId) => {
    // Tell everyone else in the project to refresh their data
    socket.to(projectId).emit("task-updated");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
});
