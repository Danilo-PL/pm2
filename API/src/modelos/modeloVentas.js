const  sequelize  = require('sequelize');
const db = require('../configuraciones/db');

const Venta = db.define(
    'Venta',
    {
        fecha: {
            type: sequelize.DATE,
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            validate: {
              isDate: {
                msg: 'La fecha de venta debe ser una fecha válida.',
              },
            },
          },
        RTN_estado: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            comment: 'Estado de RTN',
        },
        ISV: {
            type: sequelize.FLOAT,
            allowNull: true, // 
            comment: 'Impuesto sobre ventas',
        },
        descuento: {
            type: sequelize.FLOAT,
            allowNull: true, 
            comment: 'Descuento aplicado',
        },
        total: {
            type: sequelize.FLOAT,
            allowNull: false,
            defaultValue: 0,
            validate: {
              isFloat: {
                msg: 'El total debe ser un número decimal válido.',
              },
              min: {
                args: [0],
                msg: 'El total no puede ser negativo.',
              },
            },
          },
    },
    {
        tableName: 'Venta',
        timestamps: false,
        comment: 'Tabla para almacenar información de ventas',
    }
);

module.exports = Venta;
