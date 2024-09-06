import { MakeNullishOptional } from "sequelize/types/utils";
import { Inventory } from "../../domain/entities/Inventory";
import { InventoryRepository } from "../../domain/interfaces/inventoryRepository";

export class InventoryRepoImplementation implements InventoryRepository {
  inventoryItem: Inventory | undefined;

  constructor(inventoryItem: Inventory | undefined = undefined) {
    this.inventoryItem = inventoryItem;
  }

  async createItem(): Promise<Inventory | null> {
    // this method returns the newly created item in the database if the item being created does not exist and null if does
    const [itemCreated, isCreated] = await Inventory.findOrCreate({
      where: { name: this.inventoryItem!.name, supplier: this.inventoryItem!.supplier },
      defaults: {
        name: this.inventoryItem!.name,
        category: this.inventoryItem!.category,
        quantity: this.inventoryItem!.quantity,
        price: this.inventoryItem!.price,
        supplier: this.inventoryItem!.supplier,
        addedDate: this.inventoryItem!.addedDate,
      },
    });
    if (!isCreated) return null;

    return itemCreated;
  }
  async updateItemById(id: number): Promise<Inventory | null> {
    // this method returns the updated item if the id is valid and null if no record with the provided id exist
    const numUpdated = (
      await Inventory.update(
        {
          name: this.inventoryItem!.name,
          category: this.inventoryItem!.category,
          quantity: this.inventoryItem!.quantity,
          price: this.inventoryItem!.price,
          supplier: this.inventoryItem!.supplier,
          addedDate: this.inventoryItem!.addedDate,
        },
        { where: { id } }
      )
    )[0];

    if (numUpdated !== 1) return null;

    this.inventoryItem!.id = id;
    return this.inventoryItem!;
  }
  async deleteItemById(id: number): Promise<Boolean | null> {
    // this method returns the true that was deleted if the id is valid or null if no record has the id provided
    const numDeleted = await Inventory.destroy({ where: { id } });

    if (numDeleted !== 1) return null;
    return true;
  }
  async getAllItems(): Promise<Array<Inventory> | null> {
    // this method return all the data in the database or null of no data exist in the database
    const allItems = await Inventory.findAll();

    if (allItems.length === 0) return null;

    return allItems;
  }
  async getItemById(id: number): Promise<Inventory | null> {
    // this method returns the record which is the same as the id here or null if no record with this id exist
    return await Inventory.findByPk(id);
  }
}
