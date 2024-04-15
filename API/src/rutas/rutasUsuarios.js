
const { Router } = require('express');
const rutas = Router();
const { body, query } = require('express-validator');
const ControladorUsuario = require('../controladores/controladorUsuarios');
const modeloUsuario = require('../modelos/modeloUsuario');

// Rutas para usuarios
rutas.post('/guardar', [
    body('nombreUsuario').not().isEmpty(),
    body('correoElectronico').isEmail().withMessage("Debe de tener formato de correo"),
    body('contraseña').isLength({ min: 6 }),
], ControladorUsuario.GuardarUsuario);

rutas.put('/editar', [
    query('id').notEmpty(),
    body('nombreUsuario').not().isEmpty(),
    body('correoElectronico').isEmail(),
    body('contraseña').isLength({ min: 6 }),
], ControladorUsuario.EditarUsuario);

rutas.get('/listar', ControladorUsuario.ListarUsuarios);

rutas.delete('/eliminar', [
    query('id').notEmpty(),
], ControladorUsuario.EliminarUsuario);

rutas.put('/editarimagen',
  query('id').isInt().withMessage('El id debe ser un numero entero')
  .custom(async value => {
    if(!value){
      throw new Error("El id no permite valores nulos");

    }
    else{
      const buscarIdUsuario = await modeloUsuario.findOne({where: {id: value}});
      if(!buscarIdUsuario){
        throw new Error("El id del usuario no existe");
      }
    }
  })
  ,
  ControladorUsuario.validarImagen,
  ControladorUsuario.actualizarImagen
  );

module.exports = rutas;
