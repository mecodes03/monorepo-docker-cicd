import { WebSocketServer } from "ws";
import { client } from "@repo/prisma/client";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", async (ws, req) => {
  const url = req.url;
  if (!url) {
    ws.send("no url");
    return;
  }

  const params = new URLSearchParams(url.split("?")[1]);

  const userId = params.get("userId");
  if (!userId) {
    ws.send("no user Id");
    return;
  }

  const user = await client.user.findFirst({ where: { id: Number(userId) } });
  ws.send(JSON.stringify(user));

  ws.on("message", (data) => {
    const msessage = data.toString() + userId;
    ws.send(JSON.stringify(data));
  });
});
