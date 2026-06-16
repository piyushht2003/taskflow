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

  socket.on("join-workspace", (workspaceId) => {
    const room = `workspace_${workspaceId}`;
    socket.join(room);
    console.log(`Socket ${socket.id} joined workspace: ${workspaceId}`);
  });

  socket.on("leave-workspace", (workspaceId) => {
    const room = `workspace_${workspaceId}`;
    socket.leave(room);
    console.log(`Socket ${socket.id} left workspace: ${workspaceId}`);
  });

  socket.on("workspace-event", (data) => {
    // data should contain { workspaceId, type, payload }
    // Types: task-created, task-updated, task-assigned, member-added, role-changed, etc.
    const room = `workspace_${data.workspaceId}`;
    socket.to(room).emit("workspace-event", data);
  });

  // Keep legacy for backward compatibility during transition if needed
  socket.on("join-project", (projectId) => {
    socket.join(projectId);
  });
  socket.on("leave-project", (projectId) => {
    socket.leave(projectId);
  });
  socket.on("task-moved", (data) => {
    socket.to(data.projectId).emit("task-moved", data);
  });
  socket.on("task-updated", (projectId) => {
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
