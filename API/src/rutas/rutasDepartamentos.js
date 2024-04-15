const { Router } = require('express');
const { body, query } = require("express-validator");
const controladorDepartamentos = require("../controladores/controladorDepartamentos");
const rutas = Router();

rutas.get('/listar', controladorDepartamentos.ListarDepartamentos);

rutas.post(
    '/guardar',
    [
        body('nombreDepartamento').notEmpty().withMessage('El nombre del departamento no puede estar vacío'),
    ],
    controladorDepartamentos.GuardarDepartamento
);

rutas.put(
    '/editar',
    [
        query('id').notEmpty().withMessage('El id del departamento no puede estar vacío'),
        body('nombreDepartamento').notEmpty().withMessage('El nombre del departamento no puede estar vacío'),
    ],
    controladorDepartamentos.EditarDepartamento
);

rutas.delete(
    '/eliminar',
    [query('id').notEmpty().withMessage('El id del departamento no puede estar vacío')],
    controladorDepartamentos.EliminarDepartamento
);

module.exports = rutas;
