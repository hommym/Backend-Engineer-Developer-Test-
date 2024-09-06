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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectDb_1 = require("./infrastructure/database/connectDb");
const errorHandler_1 = require("./interface/middlewares/errorHandler");
const inventoryRoute_1 = require("./interface/routes/inventoryRoute");
dotenv_1.default.config();
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
// routes
app.use("/inventory", inventoryRoute_1.inventoryRouter);
// error handling middlware
app.use(errorHandler_1.errorHandler);
const port = process.env.PORT ? process.env.PORT : 8000;
const launchApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //connect to database
        yield (0, connectDb_1.connectToDatabase)();
        app.listen(port, () => {
            console.log(`Server  is listening on ${port} `);
        });
    }
    catch (error) {
        console.error(`ServerStartUpError:`, error);
    }
});
launchApp();
