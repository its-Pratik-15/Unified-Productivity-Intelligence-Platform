import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks.js";
import notesRouter from "./routes/notes.js";
import notificationsRouter from "./routes/notifications.js";
import integrationsRouter from "./routes/integrations.js";
import usersRouter from "./routes/users.js";
import focusSessionsRouter from "./routes/focusSessions.js";
import dashboardRouter from "./routes/dashboard.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Parse CORS origins from environment variable
const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173'];

app.use(cors({
  origin: corsOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Mount routes
app.use("/api/users", usersRouter);
app.use("/api/tasks", tasksRouter);
app.use("/api/notes", notesRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/integrations", integrationsRouter);
app.use("/api/focus-sessions", focusSessionsRouter);
app.use("/api/dashboard", dashboardRouter);

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`[NexaProductivity API] Server initialized on http://localhost:${PORT}`);
});
