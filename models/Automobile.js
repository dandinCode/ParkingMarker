const {DataTypes} = require("sequelize");

const db = require("../db/conn");
const Client = require("../models/Client");

const Automobile = db.define("Automobile", {
    Model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Plate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Brand: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Type: {
        type: DataTypes.ENUM("car", "motorcycle"),
        defaultValue: "car"
    }
});

Automobile.belongsTo(Client);

module.exports = Automobile;

//RF1 - Cadastrar veículo (Modelo, Marca, Placa, Tipo)