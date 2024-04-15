const Compra = require('../modelos/modeloCompra');
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const Bitacora = require('../modelos/modeloBitacora');


exports.GuardarCompra = async (req, res) => {
    try {
        const { isv, descuento, ProveedoreId, EmpleadoId  } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            const nuevaCompra = await Compra.create({
                isv,
                descuento,
                ProveedoreId,
                EmpleadoId,
                
            });
            // Guardar entrada en la bitácora
            await Bitacora.create({
                accion: 'Se realizó una compra'
            });

            res.json({ mensaje: 'Compra guardada exitosamente', compra: nuevaCompra });
            
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar la compra' });
    }
};

exports.EditarCompra = async (req, res) => {
    try {
        const { id } = req.query;
        const { isv, descuento, ProveedoreId, EmpleadoId} = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            // Buscar la compra
            const buscarCompra = await Compra.findOne({ where: { id: id } });

            if (!buscarCompra) {
                res.json({ msj: "El id de la compra no existe" });
            } else {
                // Actualizar información de la compra
                buscarCompra.isv = isv;
                buscarCompra.descuento = descuento;
                buscarCompra.ProveedoreId = ProveedoreId;
                buscarCompra.EmpleadoId = EmpleadoId;
                

                // Guardar la actualización
                await buscarCompra.save()
                    .then((data) => {
                        res.json(data);
                    }).catch((er) => {
                        res.json(er);
                    });
            }
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar la compra' });
    }
};

exports.ListarCompras = async (req, res) => {
    try {
        const listaCompras = await Compra.findAll();
        res.json(listaCompras);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de compras' });
    }
};

exports.EliminarCompra = async (req, res) => {
    const { id } = req.query;
    try {
        // Buscar la compra
        const buscarCompra = await Compra.findOne({ where: { id: id } });

        if (!buscarCompra) {
            res.json({ msj: "El id de la compra no existe" });
        } else {
            // Eliminar la compra
            await Compra.destroy({ where: { id: id } })
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