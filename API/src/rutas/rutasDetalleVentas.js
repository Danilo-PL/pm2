const { Router } = require('express');
const { body, query } = require("express-validator");
const controladorDetallesVentas = require("../controladores/controladorDetallleVentas");

const rutas = Router();

rutas.get('/listar', controladorDetallesVentas.ListarDetallesVentas);
rutas.post(
    '/guardar',
    [
        
        body('cantidad').isInt(),
        body('VentumId').notEmpty(),
        body('productoId').notEmpty(),
    ],
    controladorDetallesVentas.GuardarDetalleVenta
);

rutas.put(
    '/editar',
    [
        query('id').notEmpty(),
        
        body('cantidad').isInt(),
        body('VentumId').notEmpty(),
        body('productoId').notEmpty(),
    ],
    controladorDetallesVentas.EditarDetalleVenta
);

rutas.delete(
    '/eliminar',
    [query('id').notEmpty()],
    controladorDetallesVentas.EliminarDetalleVenta
);

module.exports = rutas;
