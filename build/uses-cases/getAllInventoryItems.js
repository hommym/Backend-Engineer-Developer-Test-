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
exports.getAllInventoryItems = void 0;
const AppError_1 = require("../domain/entities/AppError");
const inventoryRepositoryImp_1 = require("../infrastructure/repositories/inventoryRepositoryImp");
const getAllInventoryItems = () => __awaiter(void 0, void 0, void 0, function* () {
    const allItems = yield new inventoryRepositoryImp_1.InventoryRepoImplementation().getAllItems();
    if (!allItems)
        throw new AppError_1.AppError(`No item in database`, 404);
    return allItems;
});
exports.getAllInventoryItems = getAllInventoryItems;
