const DetalleCompras = require('../modelos/modeloDetalleCompra');
const { validationResult } = require("express-validator");
const Productos = require('../modelos/modeloProductos');
const Compras = require('../modelos/modeloCompra');

exports.GuardarDetalleCompra = async (req, res) => {
    try {
        const { cantidad, CompraId, productoId } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            const nuevoDetalleCompra = await DetalleCompras.create({
                cantidad,
                CompraId,
                productoId,
            });

            // Actualizar la cantidad en la tabla de Productos
            const producto = await Productos.findOne({ where: { id: productoId} });
            if (producto) {
                producto.cantidad += cantidad;
                await producto.save();

                // Calcular el monto total y acumularlo en Compras
                const montoTotal = cantidad * producto.costo_producto;
                const compra = await Compras.findOne({ where: { id: CompraId} });
                if (compra) {
                    compra.total += montoTotal;
                    await compra.save();
                }
            }

            res.json({ mensaje: 'Detalle de compra guardado exitosamente', detalleCompra: nuevoDetalleCompra });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar el detalle de compra' });
    }
};

exports.EditarDetalleCompra = async (req, res) => {
    try {
        const { id } = req.query;
        const {  cantidad, CompraId, productoId } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            // Buscar el detalle de compra
            const buscarDetalleCompra = await DetalleCompras.findOne({ where: { id: id } });

            if (!buscarDetalleCompra) {
                res.json({ msj: "El id del detalle de compra no existe" });
            } else {
                // Actualizar información del detalle de compra
                
                buscarDetalleCompra.cantidad = cantidad;
                buscarDetalleCompra.CompraId = CompraId;
                buscarDetalleCompra.productoId = productoId;
                // Guardar la actualización
                await buscarDetalleCompra.save()
                    .then((data) => {
                        res.json(data);
                    }).catch((er) => {
                        res.json(er);
                    });
            }
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar el detalle de compra' });
    }
};

exports.ListarDetallesCompras = async (req, res) => {
    try {
        const listaDetallesCompras = await DetalleCompras.findAll();
        res.json(listaDetallesCompras);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de detalles de compras' });
    }
};

exports.EliminarDetalleCompra = async (req, res) => {
    const { id } = req.query;
    try {
        // Buscar el detalle de compra
        const buscarDetalleCompra = await DetalleCompras.findOne({ where: { id: id } });

        if (!buscarDetalleCompra) {
            res.json({ msj: "El id del detalle de compra no existe" });
        } else {
            // Eliminar el detalle de compra
            await DetalleCompras.destroy({ where: { id: id } })
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
