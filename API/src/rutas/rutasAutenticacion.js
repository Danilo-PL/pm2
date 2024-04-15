const { Router } = require('express');
const { body } = require("express-validator");
const controladorAutenticacion = require("../controladores/controladorAutenticacion");
const rutas = Router();
rutas.get('/error',controladorAutenticacion.Error);
rutas.post('/iniciarsesion', 
    body('nombreusuario').isLength({ min: 3, max: 50 }).withMessage('Debe escribir un usuario de 3 a 50 caracteres'),
    body('contraseña').isLength({ min: 6, max: 12 }).withMessage('Debe escribir una contraseña de 6 a 12 caracteres'),
    controladorAutenticacion.IniciarSesion
);

module.exports = rutas;
