import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import testRoutes from "./routes/test.route.js";
import questionRoutes from "./routes/questions.route.js";
import userTests from "./routes/userTests.route.js";
import userRoutes from "./routes/user.route.js";
import friendRoutes from "./routes/userFriends.route.js";
import achievementRoutes from "./routes/achievements.route.js";
import topicsRoutes from "./routes/topics.route.js";
import userNotificationRoutes from "./routes/userNotification.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/user-tests", userTests);
app.use("/api/achievements", achievementRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/topics", topicsRoutes);
app.use("/api/notifications", userNotificationRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
