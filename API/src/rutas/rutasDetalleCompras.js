const { Router } = require('express');
const { body, query } = require("express-validator");
const controladorDetalleCompras = require("../controladores/controladorDetalleCompras");

const rutas = Router();

rutas.get('/listar', controladorDetalleCompras.ListarDetallesCompras);
rutas.post(
    '/guardar',
    [
        body('cantidad').isInt(),
        body('CompraId').notEmpty(),
        body('productoId').notEmpty(),
    ],
    controladorDetalleCompras.GuardarDetalleCompra
);

rutas.put(
    '/editar',
    [
        query('id').notEmpty(),
        body('precio').isNumeric(),
        body('cantidad').isInt(),
        body('CompraId').notEmpty(),
        body('productoId').notEmpty(),
    ],
    controladorDetalleCompras.EditarDetalleCompra
);

rutas.delete(
    '/eliminar',
    [query('id').notEmpty()],
    controladorDetalleCompras.EliminarDetalleCompra
);

module.exports = rutas;
