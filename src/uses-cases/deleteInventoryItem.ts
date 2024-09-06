import { AppError } from "../domain/entities/AppError";
import { InventoryRepoImplementation } from "../infrastructure/repositories/inventoryRepositoryImp";

export const deleteInventoryItem = async (id: number) => {
  const deletedItem = await new InventoryRepoImplementation().deleteItemById(id);

  if (!deletedItem) throw new AppError(`Cannot delete item,no item with this id=${id} exit`,404);

  return deletedItem;
};
