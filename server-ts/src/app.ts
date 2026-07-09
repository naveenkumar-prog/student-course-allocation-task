import express from "express";
import cors from "cors";


import studentRoutes from "./routes/student.routes";
import courseRoutes from "./routes/course.routes";
import preferenceRoutes from "./routes/preference.routes";
import reservationRoutes from "./routes/reservation.routes";
import allocationRoutes from "./routes/allocation.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import aiRoutes from "./routes/ai.routes";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/students", studentRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/students", preferenceRoutes);

app.use("/api/reservations", reservationRoutes);

app.use("/api/allocations", allocationRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/ai", aiRoutes);

app.use("/api/allocation", allocationRoutes);

export default app;