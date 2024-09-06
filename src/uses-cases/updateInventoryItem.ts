import { AppError } from "../domain/entities/AppError";
import { Inventory } from "../domain/entities/Inventory";
import { InventoryRepoImplementation } from "../infrastructure/repositories/inventoryRepositoryImp";

export const updateInventoryItem = async (id: number, newItem: Inventory) => {
  const updatedItem = await new InventoryRepoImplementation(newItem).updateItemById(id);

  if (!updatedItem) throw new AppError(`Cannot update item,no item with this id=${id} exist`, 404);

  return updatedItem;
};
