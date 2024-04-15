const  sequelize  = require('sequelize');
const db = require('../configuraciones/db');

const Ciudades = db.define(
  'Ciudades',
  {
    nombre_ciudad: {
      type: sequelize.STRING(50),
      allowNull: false
    },
    codigoPostal: {
      type: sequelize.STRING(5),
      allowNull: false
    },
  },
  {
    tableName: 'Ciudades',
    timestamps: false 
  }
);

module.exports = Ciudades;