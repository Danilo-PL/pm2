const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProveedores = require('../controladores/controladorProveedores');
const rutas = Router();

rutas.get('/listar', controladorProveedores.ListarProveedores);
rutas.post(
    '/guardar',
    [
        body('nom_prov').notEmpty(),
        body('telefono_prov').notEmpty(),
        body('correo_prov').isEmail(),
        body('direccion_prov').notEmpty(),
        body('Estado').isBoolean(),
        body('CiudadeId').isInt({ min: 1 }),
    ],
    controladorProveedores.GuardarProveedor
);
rutas.put(
    '/editar',
    [
        query('id').notEmpty(),
        body('nom_prov').notEmpty(),
        body('telefono_prov').notEmpty(),
        body('correo_prov').isEmail(),
        body('direccion_prov').notEmpty(),
        body('Estado').isBoolean(),
        body('CiudadeId').isInt({ min: 1 }),
    ],
    controladorProveedores.EditarProveedor
);
rutas.delete(
    '/eliminar',
    [query('id').notEmpty()],
    controladorProveedores.EliminarProveedor
);

module.exports = rutas;
