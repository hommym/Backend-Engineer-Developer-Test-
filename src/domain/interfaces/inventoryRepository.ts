import { Inventory } from "../entities/Inventory";

export interface InventoryRepository {
  createItem(): Promise<Inventory|null>;
  updateItemById(id: number): Promise<Inventory|null>;
  deleteItemById(id: number): Promise<Boolean|null>;
  getAllItems(): Promise<Array<Inventory>|null>;
  getItemById(id: number): Promise<Inventory|null>;
}
