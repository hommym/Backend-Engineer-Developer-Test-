import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./infrastructure/database/connectDb";
import { errorHandler } from "./interface/middlewares/errorHandler";
import { inventoryRouter } from "./interface/routes/inventoryRoute";
dotenv.config();

const app = express();

// middlewares
app.use(express.json());

// routes
app.use("/inventory", inventoryRouter);

app.use("/", (req: Request, res: Response) => {
  res.status(404).send("Resource not found");
});

// error handling middlware
app.use(errorHandler);

const port = process.env.PORT ? process.env.PORT : 8000;

const launchApp = async () => {
  try {
    //connect to database
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server  is listening on ${port} `);
    });
  } catch (error) {
    console.error(`ServerStartUpError:`, error);
  }
};

launchApp();
