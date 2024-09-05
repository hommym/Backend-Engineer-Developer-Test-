import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./infrastructure/database/connectDb";
dotenv.config();

const app = express();

// middlewares
app.use(express.json());

// routes

// error handling middlware

const port = process.env.PORT ? process.env.PORT : 8000;

const launchApp = async () => {
  try {
    //connect to database
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server  is listening on ${port} `);
    });
  } catch (error) {
    console.error(`ServerStartUpError:`,error);
  }
};

launchApp()
