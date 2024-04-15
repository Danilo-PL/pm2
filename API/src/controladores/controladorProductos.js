const Producto = require('../modelos/modeloProductos');
const { validationResult } = require("express-validator");
const {guardarImagenProducto} = require('../configuraciones/productos');
const { Op } = require("sequelize");
const multer = require('multer');
const productos = require('../modelos/modeloProductos');
const fs = require('fs');
const { log } = require('console');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/img/'); // Ruta relativa al directorio src
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});



const upload = multer({ storage: storage });

exports.GuardarProducto = async (req, res) => {
    try {
        const { descripcion_producto, cantidad, costo_producto, precio_actual, stock, descuento, estado, imagen, CategoriaId } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            const nuevoProducto = await Producto.create({
                descripcion_producto,
                cantidad,
                costo_producto,
                precio_actual,
                stock,
                descuento,
                estado,
                CategoriaId,
            });

            res.json({ mensaje: 'Producto guardado exitosamente', producto: nuevoProducto });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar el producto' });
    }
};

exports.Editar = async (req, res) => {
    try {
        const { id } = req.query;
        const { descripcion_producto, cantidad, costo_producto, precio_actual, stock, descuento, estado, imagen, CategoriaId } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            // Buscar el producto
            const BuscarProducto = await Producto.findOne({ where: { id: id } });

            if (!BuscarProducto) {
                res.json({ msj: "El id del producto no existe" });
            } else {
                // Actualizar información del producto
                BuscarProducto.descripcion_producto = descripcion_producto;
                BuscarProducto.cantidad = cantidad;
                BuscarProducto.costo_producto = costo_producto;
                BuscarProducto.precio_actual = precio_actual;
                BuscarProducto.stock = stock;
                BuscarProducto.descuento = descuento;
                BuscarProducto.estado = estado;
                BuscarProducto.CategoriaId = CategoriaId;

                // Guardar la actualización
                await BuscarProducto.save()
                    .then((data) => {
                        res.json(data);
                    }).catch((er) => {
                        res.json(er);
                    });
            }
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar el producto' });
    }
};

exports.ListarProductos = async (req, res) => {
    try {
        const listaProductos = await Producto.findAll();
        res.json(listaProductos);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de productos' });
    }
};

exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    try {
        // Buscar el producto
        const BuscarProducto = await Producto.findOne({ where: { id: id } });

        if (!BuscarProducto) {
            res.json({ msj: "El id del producto no existe" });
            
        } else {
            // Eliminar el producto
            await Producto.destroy({ where: { id: id } })
                .then((data) => {
                    res.json(data);
                }).catch((er) => {
                    res.json(er);
                });
        }

    } catch (error) {
        console.error(error);
        res.json({ msj: "Error de Servidor" });
    }
};

exports.validarImagen = (req, res, next) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerror = "";
        validacion.errors.forEach(r => { // Cambio de validacion.error a validacion.errors
            msjerror = msjerror + r.msg + ". "; // Cambio de r.msj a r.msg
        });
        res.json({ msj: "Hay errores en la petición", error: msjerror });
    } else {
        guardarImagenProducto(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.json({ msj: "Hay errores al cargar la imagen", error: err });
            } else if (err) {
                res.json({ msj: "Hay errores al cargar la imagen", error: err });
            } else {
                next();
            }
        });
    }
};

exports.actualizarImagen = async (req, res) => {
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            const msjerror = validacion.errors.map(error => error.msg).join('. ');
            return res.json({ msj: "Hay errores en la petición", error: msjerror });
        }

        const { id } = req.query;
        const nombreImagen = req.file.filename;
        const buscarProducto = await Producto.findOne({ where: { id: id } });

        if (!buscarProducto) {
            return res.json({ msj: "El id del producto no existe" });
        }

        let imagenAnteriorPath;
        if (buscarProducto.imagen) {
            imagenAnteriorPath = path.join(__dirname, '../../public/img/productos/', buscarProducto.imagen);
        }

        if (imagenAnteriorPath && fs.existsSync(imagenAnteriorPath)) {
            fs.unlinkSync(imagenAnteriorPath);
            console.log("Imagen anterior eliminada");
        }

        buscarProducto.imagen = nombreImagen;
        await buscarProducto.save();

        return res.json(buscarProducto);
    } catch (error) {
        console.error("Error al actualizar imagen:", error);
        return res.status(500).json({ msj: "Error interno del servidor" });
    }
};






