import express from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { swaggerDocument, swaggerUI } from "./configs/swagger.config";
import { authRouter } from "./routers/auth.router";
import { clinicRouter } from "./routers/clinic.router";
import { doctorRouter } from "./routers/doctor.router";
import { serviceRouter } from "./routers/service.router";
import { userRouter } from "./routers/user.router";

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
    console.log(" MongoDB connected");

    app.listen(config.PORT, () => {
      console.log(` Server is running: http://localhost:${config.PORT}`);
    });
  } catch (err) {
    console.error(" Failed to connect to MongoDB:", err);
    process.exit(1);
  }
}

start().catch((err) => {
  console.error("❌ Failed to start the app:", err);
  process.exit(1);
});
