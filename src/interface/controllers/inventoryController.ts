import { Request, Response,} from "express";
import asyncHandler from "express-async-handler";
import { createInventoryItem } from "../../uses-cases/createInventoryItem";
import { Inventory } from "../../domain/entities/Inventory";
import { AppError } from "../../domain/entities/AppError";
import { getAllInventoryItems } from "../../uses-cases/getAllInventoryItems";
import { getInventoryItem } from "../../uses-cases/getInventoryItem";
import { updateInventoryItem } from "../../uses-cases/updateInventoryItem";
import { deleteInventoryItem } from "../../uses-cases/deleteInventoryItem";

const checkIdValidy = (id: string) => {
  const alphaReg = /[a-zA-Z]/;
  const decimalReg = /\./;
  if (alphaReg.test(id)) {
    throw new AppError("Item id must be an integer not a character or alphanumeric characters", 400);
  } else if (decimalReg.test(id)) {
    throw new AppError("Item id must be an integer not decimal", 400);
  }
};

export const creatInventoryController = asyncHandler(async (req: Request, res: Response) => {
  const { name, category, quantity, price, supplier, addedDate } = req.body;

  const newlySavedData = await createInventoryItem(Inventory.build({ name, category, quantity, price, supplier, addedDate }));

  res.status(201).json(newlySavedData);
});

export const getAllInventoryItemsController = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(await getAllInventoryItems());
});

export const getAnItemController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  //   checking if id is a number
  checkIdValidy(id);
  res.status(200).json(await getInventoryItem(Number(id)));
});

export const updateInventoryItemController = asyncHandler(async (req: Request, res: Response) => {
  const { name, category, quantity, price, supplier, addedDate } = req.body;
  const { id } = req.params;
  //   checking if id is a number
  checkIdValidy(id);
  const updatedItem = await updateInventoryItem(Number(id), Inventory.build({ name, category, quantity, price, supplier, addedDate }));
  res.status(200).json(updatedItem);
});

export const deleteInventoryItemController = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  //   checking if id is a number
  checkIdValidy(id);
  await deleteInventoryItem(Number(id))
  res.status(204).end();
});
