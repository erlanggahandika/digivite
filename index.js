import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import solona from "./routes/solanaRoutes.js";
import './job/TelegramBot.js';

import cronjob from "./job/CronJob.js";
const app = express();

dotenv.config();



app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("public/uploads"));
app.use('/uploads/cv', express.static('public/uploads/cv'));
app.use("/public", express.static(path.join(path.resolve(), "public")));
app.use(router);
app.use(solona);

app.listen(process.env.PORT, () => console.log("server is running on port " + process.env.PORT));
