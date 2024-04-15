const { Router } = require('express');
const { body, query} = require("express-validator");
const controladorClientes = require("../controladores/controladorClientes");
const rutas = Router();
rutas.get('/Listar', controladorClientes.Listar);
rutas.get('/Buscarid',
query("id").isInt().withMessage("El id debe ser un numero entero"),
controladorClientes.Buscarid)
rutas.get('/buscarprimernombre',
query("filtro").notEmpty().withMessage("No se permiten valores vacios en la busqueda"),
controladorClientes.BuscarPrimerNombre)
rutas.get('/buscarprimerapellido',
query("filtro").notEmpty().withMessage("No se permiten valores vacios en la busqueda"),
controladorClientes.BuscarPrimerApellido)
rutas.get('/buscar',
query("filtro").notEmpty().withMessage("No se permiten valores vacios en la busqueda"),
controladorClientes.Buscar)
rutas.post('/guardar', controladorClientes.Guardar);
rutas.put('/editar', controladorClientes.Editar);
rutas.delete('/eliminar', controladorClientes.Eliminar);
module.exports = rutas;