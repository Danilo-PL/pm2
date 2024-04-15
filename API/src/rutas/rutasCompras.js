const { Router } = require('express');
const { body, query } = require("express-validator");
const controladorCompras = require("../controladores/controladorCompra");
const rutas = Router();

rutas.get('/listar', controladorCompras.ListarCompras);
rutas.post(
    '/guardar',
    [
        body('isv').isNumeric(),
        body('descuento').isNumeric(),
    ],
    controladorCompras.GuardarCompra
);
rutas.put(
    '/editar',
    [
        query('id').notEmpty(),
        body('fecha_compra').notEmpty().isDate({ format: "YYYY-MM-DD HH:mm:ss" }),
        body('isv').isNumeric(),
        body('descuento').isNumeric(),
    ],
    controladorCompras.EditarCompra
);
rutas.delete(
    '/eliminar',
    [query('id').notEmpty()],
    controladorCompras.EliminarCompra
);

module.exports = rutas;
