import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path";
import {fileURLToPath} from "url";

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB();
//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Create an Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Enable CORS with options to allow credentials
app.use(
  cors({
    origin: true, // Allow all origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(express.static(path.join(__dirname,"./client/build")))

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Welcome message for root route
app.use("*",function(req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"))
})
// Set up the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`);
});