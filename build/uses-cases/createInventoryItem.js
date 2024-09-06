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
exports.createInventoryItem = void 0;
const AppError_1 = require("../domain/entities/AppError");
const inventoryRepositoryImp_1 = require("../infrastructure/repositories/inventoryRepositoryImp");
const createInventoryItem = (item) => __awaiter(void 0, void 0, void 0, function* () {
    if (!item.name || !item.supplier)
        throw new AppError_1.AppError(`No data was pass for ${!item.name ? "name" : "supplier"} field in request body`, 400);
    else if (typeof item.name !== "string" || typeof item.supplier !== "string")
        throw new AppError_1.AppError(`${typeof item.name !== "string" ? "name" : "supplier"} must contain string data`, 400);
    const itemCreated = yield new inventoryRepositoryImp_1.InventoryRepoImplementation(item).createItem();
    if (!itemCreated)
        throw new AppError_1.AppError(`Cannot save Inventory Item ,an item with this name ${item.name} and supplier ${item.supplier} already exist.`, 409);
    return itemCreated;
});
exports.createInventoryItem = createInventoryItem;
