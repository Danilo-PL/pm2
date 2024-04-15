const { Router } = require('express');
const { body, query} = require("express-validator");
const controladorCategorias = require("../controladores/controladorCategoria");

const rutas = Router();

rutas.get('/listar', controladorCategorias.ListarCategorias);
rutas.post(
    '/guardar',
    [body('descripcion_categoria').notEmpty()],
    controladorCategorias.GuardarCategoria
  );
  
  rutas.put(
    '/editar',
    [
      query('id').notEmpty(),
      body('descripcion_categoria').notEmpty(),
    ],
    controladorCategorias.EditarCategoria
  );
  
  rutas.delete(
    '/eliminar',
    [query('id').notEmpty()],
    controladorCategorias.EliminarCategoria
  );
  
  module.exports = rutas;
