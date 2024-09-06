import { Router } from "express";
import { creatInventoryController, deleteInventoryItemController, getAllInventoryItemsController, getAnItemController, updateInventoryItemController } from "../controllers/inventoryController";

export const inventoryRouter = Router();

inventoryRouter.post("/", creatInventoryController);
inventoryRouter.get("/", getAllInventoryItemsController);
inventoryRouter.get("/:id", getAnItemController);
inventoryRouter.put("/:id", updateInventoryItemController);
inventoryRouter.delete("/:id", deleteInventoryItemController);
