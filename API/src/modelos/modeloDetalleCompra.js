const sequelize  = require('sequelize');
const db = require('../configuraciones/db');

const DetalleCompras = db.define(
    'DetalleCompras',
    {
       
        cantidad: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: 'La cantidad debe ser un número válido.',
                },
                min: {
                    args: [0],
                    msg: 'La cantidad no puede ser negativa.',
                },
            },
            comment: 'Cantidad vendida',
        },
    },
    {
        tableName: 'DetalleCompras',
        timestamps: false,
    }
);
module.exports = DetalleCompras;