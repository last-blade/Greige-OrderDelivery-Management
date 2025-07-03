import express, { urlencoded } from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config({
    path: "./.env"
});

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json({limit: "16kb"}));
app.use(urlencoded({extended: true, limit: "16kb"}));
app.use(cookieParser());
app.use(express.static("public"));


//importing Routes
import userRoute from "./routes/user.routes.js";
import greigeRoute from "./routes/greige.routes.js";
import unit3Route from "./routes/unit3.routes.js";


//User Route
app.use("/api/v1/user", userRoute);

//Greige Route
app.use("/api/v1/greige", greigeRoute);

//Unit3 Route
app.use("/api/v1/unit3", unit3Route);

export { app }