import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { connectDB } from "./config/database";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";

dotenv.config();

const app = express();
const theme = new SwaggerTheme();
const swaggerOptions = theme.getDefaultConfig(SwaggerThemeNameEnum.DARK);

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
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Docs at http://localhost:${PORT}/api-docs"`);
});
