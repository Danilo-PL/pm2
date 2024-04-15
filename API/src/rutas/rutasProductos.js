const { Router } = require('express');
const { body, query } = require("express-validator");
const controladorProductos = require("../controladores/controladorProductos");
const multer = require('multer');
const modeloProductos = require('../modelos/modeloProductos');
const passport = require('../configuraciones/passport');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/img/'); // Ruta relativa al directorio src
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });
const rutas = Router();
rutas.get('/listar', controladorProductos.ListarProductos);
rutas.post(
  '/guardar',
  [
      body('descripcion_producto').notEmpty(),
      body('cantidad').isInt({ min: 0 }),
      body('costo_producto').isNumeric(),
      body('precio_actual').isNumeric(),
      body('stock').isInt({ min: 0 }),
      body('descuento').isNumeric(),
  ],
  upload.single('imagen'),
  passport.VerificarUsuario,
  controladorProductos.GuardarProducto
  
);
rutas.put(
  '/editar',
  [
      query('id').notEmpty(),
      body('descripcion_producto').notEmpty(),
      body('cantidad').isInt({ min: 0 }),
      body('costo_producto').isNumeric(),
      body('precio_actual').isNumeric(),
      body('stock').isInt({ min: 0 }),
      body('descuento').isNumeric(),
      body('estado').isBoolean().toInt().isIn([0, 1]).withMessage('El campo estado debe ser 0 o 1'),
      body('CategoriaId').isInt(),
  ],
  controladorProductos.Editar
);
  rutas.delete(
    '/eliminar',
    [query('id').notEmpty()],
    controladorProductos.Eliminar
  );
  rutas.put('/editarimagen',
  query('id').isInt().withMessage('El id debe ser un numero entero')
  .custom(async value => {
    if(!value){
      throw new Error("El id no permite valores nulos");

    }
    else{
      const buscarIdProducto = await modeloProductos.findOne({where: {id: value}});
      if(!buscarIdProducto){
        throw new Error("El id del producto no existe");
      }
    }
  })
  ,
  controladorProductos.validarImagen,
  controladorProductos.actualizarImagen
  );
  module.exports = rutas;
