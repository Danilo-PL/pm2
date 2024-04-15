const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorRolesEmpleados = require('../controladores/controladorRolesEmpleados');
const rutas = Router();

rutas.get('/listar', controladorRolesEmpleados.ListarRolesEmpleados);
rutas.post(
    '/guardar',
    [
        body('descripcion').notEmpty(),
    ],
    controladorRolesEmpleados.GuardarRolEmpleado
);
rutas.put(
    '/editar',
    [
        query('id').notEmpty(),
        body('descripcion').notEmpty(),
    ],
    controladorRolesEmpleados.EditarRolEmpleado
);
rutas.delete(
    '/eliminar',
    [query('id').notEmpty()],
    controladorRolesEmpleados.EliminarRolEmpleado
);

module.exports = rutas;
