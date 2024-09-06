import { AppError } from "../domain/entities/AppError";
import { Inventory } from "../domain/entities/Inventory";
import { InventoryRepoImplementation } from "../infrastructure/repositories/inventoryRepositoryImp";

export const createInventoryItem = async (item: Inventory) => {
  if (!item.name || !item.supplier) throw new AppError(`No data was pass for ${!item.name ? "name" : "supplier"} field in request body`, 400);
  else if (typeof item.name !== "string" || typeof item.supplier !== "string") throw new AppError(`${typeof item.name !== "string" ? "name" : "supplier"} must contain string data`, 400);

  const itemCreated = await new InventoryRepoImplementation(item).createItem();

  if (!itemCreated) throw new AppError(`Cannot save Inventory Item ,an item with this name ${item.name} and supplier ${item.supplier} already exist.`, 409);

  return itemCreated;
};
