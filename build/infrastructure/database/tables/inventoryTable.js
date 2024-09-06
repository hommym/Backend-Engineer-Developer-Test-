"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineInventoryTableStructure = void 0;
const sequelize_1 = require("sequelize");
const Inventory_1 = require("../../../domain/entities/Inventory");
const connectDb_1 = require("../connectDb");
const defineInventoryTableStructure = () => {
    Inventory_1.Inventory.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER(),
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "No data was pass for name field in request body",
                },
                notEmpty: { msg: "name field cannot be empty" },
                not: { args: /^\d+$/i, msg: "name field must contain string data" },
            },
        },
        category: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "No data was pass for category field in request body",
                },
                notEmpty: { msg: "category field cannot be empty" },
                isAlpha: { msg: "category field must contain string data" },
            },
        },
        quantity: {
            type: sequelize_1.DataTypes.INTEGER(),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "No data was pass for quantity field in request body",
                },
                isInt: { msg: "quantity field must conain integer data" },
                min: { args: [0], msg: "quantity field cannot be a negative value" },
            },
        },
        price: {
            type: sequelize_1.DataTypes.DECIMAL(20, 2),
            allowNull: false,
            validate: {
                isDecimal: { msg: "price field must contain decimal data" },
                notNull: {
                    msg: "No data was pass for price field in request body",
                },
                min: { args: [0], msg: "price field cannot be a negative value" },
            },
        },
        supplier: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "No data was pass for supplier field in request body",
                },
                notEmpty: { msg: "supplier field cannot be empty" },
                not: { args: /^\d+$/i, msg: "supplier field must contain string data" },
            },
        },
        addedDate: {
            type: sequelize_1.DataTypes.STRING(),
            allowNull: false,
            validate: {
                is: { args: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|30|31)$/i, msg: "addedDate field must contain data  in Date format(ie yyyy-mm-dd )" },
                notNull: {
                    msg: "No data was pass for addedDate field in request body",
                },
                notEmpty: { msg: "addedDate field cannot be empty" },
            },
        },
    }, {
        sequelize: connectDb_1.sequelize,
        tableName: "Inventories",
        timestamps: false,
    });
};
exports.defineInventoryTableStructure = defineInventoryTableStructure;
