const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEnvios = require('../controladores/controladorEnvios');
const rutas = Router();

rutas.get('/listar', controladorEnvios.ListarEnvios);
rutas.post(
    '/guardar',
    [
        body('direccion').notEmpty(),
        body('CiudadeId').isInt({ min: 1 }),
        body('VentumId').isInt({ min: 1 }),
        body('EmpresasEnvioId').isInt({ min: 1 }),
    ],
    controladorEnvios.GuardarEnvio
);
rutas.put(
    '/editar',
    [
        query('id').notEmpty(),
        body('direccion').notEmpty(),
        body('CiudadeId').isInt({ min: 1 }),
        body('VentumId').isInt({ min: 1 }),
        body('EmpresasEnvioId').isInt({ min: 1 }),
    ],
    controladorEnvios.EditarEnvio
);
rutas.delete(
    '/eliminar',
    [query('id').notEmpty()],
    controladorEnvios.EliminarEnvio
);

module.exports = rutas;
