import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { PORT } from "./environment";
import usersRoute from "./routes/users.routes";
import coinFlipRoute from "./routes/coin-flip.routes";

const app = new Hono();
app.use("/*", cors());

app.route("/users", usersRoute);
app.route("/coin-flip", coinFlipRoute);

console.log(`Server is running on http://localhost:${PORT}`);

serve({
  fetch: app.fetch,
  port: PORT,
});
