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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventoryItemController = exports.updateInventoryItemController = exports.getAnItemController = exports.getAllInventoryItemsController = exports.creatInventoryController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const createInventoryItem_1 = require("../../uses-cases/createInventoryItem");
const Inventory_1 = require("../../domain/entities/Inventory");
const AppError_1 = require("../../domain/entities/AppError");
const getAllInventoryItems_1 = require("../../uses-cases/getAllInventoryItems");
const getInventoryItem_1 = require("../../uses-cases/getInventoryItem");
const updateInventoryItem_1 = require("../../uses-cases/updateInventoryItem");
const deleteInventoryItem_1 = require("../../uses-cases/deleteInventoryItem");
const checkIdValidy = (id) => {
    const alphaReg = /[a-zA-Z]/;
    const decimalReg = /\./;
    if (alphaReg.test(id)) {
        throw new AppError_1.AppError("Item id must be an integer not a character or alphanumeric characters", 400);
    }
    else if (decimalReg.test(id)) {
        throw new AppError_1.AppError("Item id must be an integer not decimal", 400);
    }
};
exports.creatInventoryController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, quantity, price, supplier, addedDate } = req.body;
    const newlySavedData = yield (0, createInventoryItem_1.createInventoryItem)(Inventory_1.Inventory.build({ name, category, quantity, price, supplier, addedDate }));
    res.status(201).json(newlySavedData);
}));
exports.getAllInventoryItemsController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json(yield (0, getAllInventoryItems_1.getAllInventoryItems)());
}));
exports.getAnItemController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //   checking if id is a number
    checkIdValidy(id);
    res.status(200).json(yield (0, getInventoryItem_1.getInventoryItem)(Number(id)));
}));
exports.updateInventoryItemController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, quantity, price, supplier, addedDate } = req.body;
    const { id } = req.params;
    //   checking if id is a number
    checkIdValidy(id);
    const updatedItem = yield (0, updateInventoryItem_1.updateInventoryItem)(Number(id), Inventory_1.Inventory.build({ name, category, quantity, price, supplier, addedDate }));
    res.status(200).json(updatedItem);
}));
exports.deleteInventoryItemController = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    //   checking if id is a number
    checkIdValidy(id);
    yield (0, deleteInventoryItem_1.deleteInventoryItem)(Number(id));
    res.status(204).end();
}));
