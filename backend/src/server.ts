import http from "http";

import app from "./app";
import { PORT } from "./config/env";
import { connectToDB } from "./db/connect";
import { initializeSocket } from "./socket";

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  await connectToDB();
});
