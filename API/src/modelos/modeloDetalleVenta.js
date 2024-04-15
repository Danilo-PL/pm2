const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const DetallesVentas = db.define(
    'DetallesVentas',
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
        tableName: 'DetallesVentas',
        timestamps: false,
        comment: 'Tabla para almacenar detalles de ventas',
    }
);
module.exports = DetallesVentas;
