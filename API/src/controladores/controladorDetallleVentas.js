const DetallesVentas = require('../modelos/modeloDetalleVenta');
const Productos = require('../modelos/modeloProductos');
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const Ventas = require('../modelos/modeloVentas');

exports.GuardarDetalleVenta = async (req, res) => {
    try {
        const {  cantidad, VentumId, productoId } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            // Verificar si la cantidad en detalle de ventas es menor o igual a la cantidad de productos disponibles
            const producto = await Productos.findOne({ where: { id: productoId } });
            if (!producto || cantidad > producto.cantidad) {
                res.json({ msj: "La cantidad en detalle de ventas es mayor a la cantidad de productos disponibles" });
            } else {
                // Crear un nuevo detalle de venta
                const nuevoDetalleVenta = await DetallesVentas.create({
                    cantidad,
                    VentumId,
                    productoId,
                });

                // Restar la cantidad en la tabla de Productos
                producto.cantidad -= cantidad;
                await producto.save();

                // Calcular el monto total y acumularlo en Compras
                const montoTotal = cantidad * producto.precio_actual;
                const venta = await Ventas.findOne({ where: { id: VentumId} });
                if (venta) {
                    venta.total += montoTotal;
                    await venta.save();
                }
                res.json({ mensaje: 'Detalle de venta guardado exitosamente', detalleVenta: nuevoDetalleVenta });
            }
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar el detalle de venta' });
    }
};

exports.EditarDetalleVenta = async (req, res) => {
    try {
        const { id } = req.query;
        const {  cantidad, VentumId, productoId } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            // Buscar el detalle de venta
            const buscarDetalleVenta = await DetallesVentas.findOne({ where: { id: id } });

            if (!buscarDetalleVenta) {
                res.json({ msj: "El id del detalle de venta no existe" });
            } else {
                // Actualizar información del detalle de venta
                buscarDetalleVenta.cantidad = cantidad;
                buscarDetalleVenta.VentumId = VentumId;
                buscarDetalleVenta.productoId = productoId;

                // Guardar la actualización
                await buscarDetalleVenta.save()
                    .then((data) => {
                        res.json(data);
                    }).catch((er) => {
                        res.json(er);
                    });
            }
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar el detalle de venta' });
    }
};

exports.ListarDetallesVentas = async (req, res) => {
    try {
        const listaDetallesVentas = await DetallesVentas.findAll();
        res.json(listaDetallesVentas);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de detalles de ventas' });
    }
};

exports.EliminarDetalleVenta = async (req, res) => {
    const { id } = req.query;
    try {
        // Buscar el detalle de venta
        const buscarDetalleVenta = await DetallesVentas.findOne({ where: { id: id } });

        if (!buscarDetalleVenta) {
            res.json({ msj: "El id del detalle de venta no existe" });
        } else {
            // Eliminar el detalle de venta
            await DetallesVentas.destroy({ where: { id: id } })
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
