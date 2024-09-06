import { AppError } from "../domain/entities/AppError";
import { InventoryRepoImplementation } from "../infrastructure/repositories/inventoryRepositoryImp";

export const getInventoryItem = async (id: number) => {
  const item = await new InventoryRepoImplementation().getItemById(id);

  if (!item) throw new AppError(`Cannot get item,no item with this id=${id} exist`, 404);
  return item;
};
