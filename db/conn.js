const {Sequelize} = require("sequelize");

const sequelize = new Sequelize("parkingmarker", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;