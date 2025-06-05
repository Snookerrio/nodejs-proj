import express from "express";
import { config } from "./configs/config";
import mongoose from "mongoose";
import {userRouter} from "./routers/user.router";
import {doctorRouter} from "./routers/doctor.router";
import {clinicRouter} from "./routers/clinic.router";
import {serviceRouter} from "./routers/service.router";
import {authRouter} from "./routers/auth.router";
import{swaggerUI, swaggerDocument} from "./configs/swagger.config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users", userRouter);
app.use("/doctors", doctorRouter);
app.use("/clinics", clinicRouter);
app.use("/services", serviceRouter);
app.use("/auth", authRouter);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));




async function start() {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log(' MongoDB connected');

        app.listen(config.PORT, () => {
            console.log(` Server is running: http://localhost:${config.PORT}`);
        });
    } catch (err) {
        console.error(' Failed to connect to MongoDB:', err);
        process.exit(1);
    }
}

start();
