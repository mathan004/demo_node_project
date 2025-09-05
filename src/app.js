import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import userRouter from "./routes/user_route.js";
import roleRouter from "./routes/role_route.js";
import loginRouter from "./routes/auth_route.js";

import swaggerDocs from "./config/swagger.js";




const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


// Routes
app.use("/api/users", userRouter);
app.use("/api/roles",roleRouter)
app.use("/api/auth",loginRouter)

swaggerDocs(app);




// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
  next()
});

export default app;
