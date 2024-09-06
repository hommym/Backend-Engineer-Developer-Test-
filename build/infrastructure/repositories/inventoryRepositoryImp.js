"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRepoImplementation = void 0;
const Inventory_1 = require("../../domain/entities/Inventory");
class InventoryRepoImplementation {
    constructor(inventoryItem = undefined) {
        this.inventoryItem = inventoryItem;
    }
    createItem() {
        return __awaiter(this, void 0, void 0, function* () {
            // this method returns the newly created item in the database if the item being created does not exist and null if does
            const [itemCreated, isCreated] = yield Inventory_1.Inventory.findOrCreate({
                where: { name: this.inventoryItem.name, supplier: this.inventoryItem.supplier },
                defaults: {
                    name: this.inventoryItem.name,
                    category: this.inventoryItem.category,
                    quantity: this.inventoryItem.quantity,
                    price: this.inventoryItem.price,
                    supplier: this.inventoryItem.supplier,
                    addedDate: this.inventoryItem.addedDate,
                },
            });
            if (!isCreated)
                return null;
            return itemCreated;
        });
    }
    updateItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // this method returns the updated item if the id is valid and null if no record with the provided id exist
            const numUpdated = (yield Inventory_1.Inventory.update({
                name: this.inventoryItem.name,
                category: this.inventoryItem.category,
                quantity: this.inventoryItem.quantity,
                price: this.inventoryItem.price,
                supplier: this.inventoryItem.supplier,
                addedDate: this.inventoryItem.addedDate,
            }, { where: { id } }))[0];
            if (numUpdated !== 1)
                return null;
            this.inventoryItem.id = id;
            return this.inventoryItem;
        });
    }
    deleteItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // this method returns the true that was deleted if the id is valid or null if no record has the id provided
            const numDeleted = yield Inventory_1.Inventory.destroy({ where: { id } });
            if (numDeleted !== 1)
                return null;
            return true;
        });
    }
    getAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            // this method return all the data in the database or null of no data exist in the database
            const allItems = yield Inventory_1.Inventory.findAll();
            if (allItems.length === 0)
                return null;
            return allItems;
        });
    }
    getItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // this method returns the record which is the same as the id here or null if no record with this id exist
            return yield Inventory_1.Inventory.findByPk(id);
        });
    }
}
exports.InventoryRepoImplementation = InventoryRepoImplementation;
