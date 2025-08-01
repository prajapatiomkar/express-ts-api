import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import swaggerUi from "swagger-ui-express";
import { connectDB } from "./config/database";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import swaggerSpec from "./swagger";

dotenv.config();

const app = express();
const theme = new SwaggerTheme();
const swaggerOptions = theme.getDefaultConfig(
  process.env.SWAGGER_THEME
    ? SwaggerThemeNameEnum.DARK
    : SwaggerThemeNameEnum.CLASSIC
);

connectDB();
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerOptions)
);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Docs at http://localhost:${PORT}/api-docs"`);
});
