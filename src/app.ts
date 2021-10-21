import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from 'socket.io';
import { router } from "./routes";
import cors from "cors";

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  }
});

io.on("connection", socket => {
  console.log("Nova conexão");
  socket.on("disconnect", () => {
    console.log("Usuário desconectado");
  });
})

app.use(express.json());
app.use(router);

export { serverHttp, io };
