import { DataTypes } from "sequelize";
import database from "./db";

const Programmer = database.define('programmer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    javascript: DataTypes.BOOLEAN,
    java: DataTypes.BOOLEAN,
    python: DataTypes.BOOLEAN,
})

export default Programmer;