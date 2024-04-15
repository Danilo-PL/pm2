const sequelize = require("sequelize");
const db = new sequelize(
    "ferreteriaapi", //nombre de la base de datos 
    "root", //usuario de la base de datos
    "Dp@guada181818", //contrasenhia del usuario
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306
    }
);
module.exports = db;