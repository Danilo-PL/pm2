const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpresasEnvio = require('../controladores/controladorEmpresaEnvios');
const rutas = Router();

rutas.get('/listar', controladorEmpresasEnvio.ListarEmpresasEnvio);
rutas.post(
    '/guardar',
    [
        body('nombre_empresa').notEmpty(),
        body('direccion_empresa').notEmpty(),
        body('telefono_empresa').notEmpty(),
        body('id_ciudad').isInt({ min: 1 }),
        body('estado').isIn(['1', '0']),
        body('correo_empresa').isEmail(),
    ],
    controladorEmpresasEnvio.GuardarEmpresaEnvio
);
rutas.put(
    '/editar',
    [
        query('id').notEmpty(),
        body('nombre_empresa').notEmpty(),
        body('direccion_empresa').notEmpty(),
        body('telefono_empresa').notEmpty(),
        body('id_ciudad').isInt({ min: 1 }),
        body('estado').isIn(['1', '0']),
        body('correo_empresa').isEmail(),
    ],
    controladorEmpresasEnvio.EditarEmpresaEnvio
);
rutas.delete(
    '/eliminar',
    [query('id').notEmpty()],
    controladorEmpresasEnvio.EliminarEmpresaEnvio
);

module.exports = rutas;
