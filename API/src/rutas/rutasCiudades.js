const { Router } = require('express');
const { body, query} = require("express-validator");
const controladorCiudades = require("../controladores/controladorCiudad");

const rutas = Router();


rutas.get('/listar', controladorCiudades.ListarCiudades);
rutas.post(
    '/guardar',
    [
      body('nombre_ciudad').notEmpty(),
      body('codigoPostal').isPostalCode('any'),
    ],
    controladorCiudades.GuardarCiudad
  );
  
  rutas.put(
    '/editar',
    [
      query('id').notEmpty(),
      body('nombre_ciudad').notEmpty(),
      body('codigoPostal').isPostalCode('any'),
    ],
    controladorCiudades.EditarCiudad
  );
  
  rutas.delete(
    '/eliminar',
    [query('id').notEmpty()],
    controladorCiudades.EliminarCiudad
  );
  
  module.exports = rutas;
