import express from "express";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import path from "path";
// server.ts
import { PORT, HOST } from "./config";
import { getLocalIPs } from "./ip";

const app = express();
app.use(express.static(path.join(process.cwd(), "public")));

const server = createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  socket.on("message", (data) => {
    const msg = JSON.parse(data.toString());
    wss.clients.forEach((c) => {
      if (c.readyState === 1) c.send(JSON.stringify({ type: "eco", msg }));
    });
  });
});


server.listen(PORT, HOST, () => {
  console.log(`Local:  http://localhost:${PORT}`);
  getLocalIPs().forEach((ip) => console.log(`Red:    http://${ip}:${PORT}`));
});