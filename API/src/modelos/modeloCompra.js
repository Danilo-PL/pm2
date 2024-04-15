const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const Compras = db.define(
  'Compras',
  {
    fecha_compra: {
      type: sequelize.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      validate: {
        isDate: {
          msg: 'La fecha de compra debe ser una fecha válida.',
        },
      },
    },
    isv: {
      type: sequelize.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'El ISV debe ser un número decimal válido.',
        },
        min: {
          args: [0],
          msg: 'El ISV no puede ser negativo.',
        },
      },
    },
    descuento: {
      type: sequelize.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'El descuento debe ser un número decimal válido.',
        },
        min: {
          args: [0],
          msg: 'El descuento no puede ser negativo.',
        },
      },
    },
    total: {
      type: sequelize.FLOAT,
      allowNull: true,
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
    tableName: 'Compras',
    timestamps: false,
  }
);

module.exports = Compras;
