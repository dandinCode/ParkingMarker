const {DataTypes} = require("sequelize");

const db = require("../db/conn");

const Client = db.define("Client", {
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Telephone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CPF: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Client;