import express from "express";
import path from "path";
import { UserMiddleware } from "./users/user-middleware";
import UserService from "./users/user-service";

const DEFAULT_PORT = 5000;
const PORT = Number(process.env.PORT) || DEFAULT_PORT;

const app = express();

const appDir = path.resolve(__dirname, "../ui");

app.use(express.json());
app.use("/", express.static(appDir))

app.use(UserMiddleware("/api/users"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
