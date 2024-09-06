import { AppError } from "../domain/entities/AppError";
import { InventoryRepoImplementation } from "../infrastructure/repositories/inventoryRepositoryImp";

export const getAllInventoryItems = async () => {
  const allItems = await new InventoryRepoImplementation().getAllItems();

  if (!allItems) throw new AppError(`No item in database`, 404);

  return allItems;
};
