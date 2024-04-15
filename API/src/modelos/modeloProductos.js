const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const productos = db.define(
    'productos',
    {
        descripcion_producto: {
            type: sequelize.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: 'La descripción del producto ya existe',
            },
        },
        cantidad: {
            type: sequelize.INTEGER,
        },
        costo_producto: {
            type: sequelize.FLOAT,
        },
        precio_actual: {
            type: sequelize.FLOAT,
        },
        stock: {
            type: sequelize.FLOAT,
        },
        descuento: {
            type: sequelize.FLOAT,
        },
        estado: {
            type: sequelize.BOOLEAN,
            defaultValue: true,
        },
        imagen: {
            type: sequelize.STRING(250),
            allowNull: true,
        },
    },
    {
        tableName: 'Productos',
        timestamps: true,
    }
);

module.exports = productos;