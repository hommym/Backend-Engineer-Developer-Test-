import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import { defineAllTablesStructures } from "./defineTableStructures";

export const sequelize = new Sequelize(process.env.DatabaseUri!, { dialectOptions: { ssl: { require: true } }, logging:false });

export const connectToDatabase = async () => {
  console.log("Establishing Database connection...");
  // connect to the database
  await sequelize.authenticate();
  console.log("Database connection sucessful");
  // models definition
  console.log("Defining Tables Structures...");
  defineAllTablesStructures();
  console.log("Table Structures defined");
  //models syncronization
  console.log("Database syncronising..");
  await sequelize.sync();
  console.log("Syncronization sucessfull");
};
