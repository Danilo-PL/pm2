const sequelize  = require('sequelize');
const db = require('../configuraciones/db');

const Categorias = db.define(
  'Categorias',
  {
    descripcion_categoria: {
      type: sequelize.STRING(50),
      allowNull: false
    },
    
  },
  {
    tableName: 'Categorias',
    timestamps: false 
  }
);

module.exports = Categorias;