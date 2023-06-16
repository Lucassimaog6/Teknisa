"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("./db"));
const Programmer = db_1.default.define('programmer', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: sequelize_1.DataTypes.STRING,
    javascript: sequelize_1.DataTypes.BOOLEAN,
    java: sequelize_1.DataTypes.BOOLEAN,
    python: sequelize_1.DataTypes.BOOLEAN,
});
exports.default = Programmer;
