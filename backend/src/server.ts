import app from "./app";
import { PORT } from "./config/env";
import { connectToDB } from "./db/connect";

// Start server
app.listen(PORT, async () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  await connectToDB();
});
