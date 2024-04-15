
const { Router } = require('express');
const rutas = Router();
const { body, query } = require('express-validator');
const ControladorVentas = require('../controladores/controladorVentas');

// Rutas para ventas
rutas.post('/guardar', [
    body('RTN_estado').not().isEmpty().isBoolean(),
    body('ISV').optional().isFloat(),
    body('descuento').optional().isFloat(),
    body('UsuarioId').optional().isInt(),
], ControladorVentas.GuardarVenta);

rutas.put('/editar', [
    query('id').notEmpty(),
    body('fecha').optional().isISO8601(),
    body('RTN_estado').not().isEmpty().isBoolean(),
    body('ISV').optional().isFloat(),
    body('descuento').optional().isFloat(),
    body('UsuarioId').optional().isInt(),
], ControladorVentas.EditarVenta);

rutas.get('/listar', ControladorVentas.ListarVentas);

rutas.delete('/eliminar', [
    query('id').notEmpty(),
], ControladorVentas.EliminarVenta);

module.exports = rutas;
