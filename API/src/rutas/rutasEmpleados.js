const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleados = require('../controladores/controladorEmpleado');
const rutas = Router();

rutas.get('/listar', controladorEmpleados.ListarEmpleados);

rutas.post(
    '/guardar',
    [
        body('nom_empleado').notEmpty(),
        body('apellido_empleado').notEmpty(),
        body('telefono_empleado').notEmpty(),
        body('direccion_empleado').notEmpty(),
    ],
    controladorEmpleados.GuardarEmpleado
);

rutas.put(
    '/editar',
    [
        query('id').notEmpty(),
        body('nom_empleado').notEmpty(),
        body('apellido_empleado').notEmpty(),
        body('telefono_empleado').notEmpty(),
        body('direccion_empleado').notEmpty(),
        body('Estado').isIn(['1', '0']),
        body('RolesEmpleadoId').isInt(),
        body('CiudadeId').isInt(),
    ],
    controladorEmpleados.EditarEmpleado
);

rutas.delete(
    '/eliminar',
    [query('id').notEmpty()],
    controladorEmpleados.EliminarEmpleado
);

module.exports = rutas;
