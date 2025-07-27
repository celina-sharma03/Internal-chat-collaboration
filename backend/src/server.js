import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRoutes from "./routes/message.route.js";
import userRoutes from "./routes/user.js";
import {app,server} from "./lib/socket.js";


dotenv.config();
// const app = express();


const PORT = process.env.PORT;


app.use(express.json({limit: "10mb"}));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);

server.listen(PORT, () => {
  console.log("Server is running on port PORT:" + PORT);
  connectDB();
});
