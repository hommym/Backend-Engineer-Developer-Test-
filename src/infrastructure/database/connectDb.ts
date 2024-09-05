import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.DatabaseUri!,{dialectOptions:{ssl:{require:true}}});

export const connectToDatabase = async () => {
  console.log("Establishing Database connection...");
  // connect to the database
  await sequelize.authenticate();
  console.log("Database connection sucessful");
  //models syncronization
  console.log("Database syncronising..");
  await sequelize.sync();
  console.log("Syncronization sucessfull");
};
