const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const Bitacora = db.define(
  'Bitacora',
  {
    accion: {
      type: sequelize.STRING(300), 
      allowNull: false
    }
  },
  {
    tableName: 'Bitacora',
    timestamps: true 
  }
);

module.exports = Bitacora;
