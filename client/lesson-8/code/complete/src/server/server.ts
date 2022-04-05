import express from "express";
import path from "path";

import { createSimpleMiddleware } from "./simple-middleware";
import { createUsersMiddleware } from "./users-middleware";

const DEFAULT_PORT = 5000;
const PORT = Number(process.env.PORT) || DEFAULT_PORT;

const app = express();

const appDir = path.resolve(__dirname, "../ui");

app.use(express.json());
app.use(createUsersMiddleware("/api/users"));
app.use(createSimpleMiddleware("/api"));
app.use("/", express.static(appDir));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`node is running on port ${PORT}`);
});
