"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineAllTablesStructures = void 0;
const inventoryTable_1 = require("./tables/inventoryTable");
// method for defining all table structures using the models
const defineAllTablesStructures = () => {
    (0, inventoryTable_1.defineInventoryTableStructure)();
};
exports.defineAllTablesStructures = defineAllTablesStructures;
