const Venta = require('../modelos/modeloVentas');
const { validationResult } = require('express-validator');
const Bitacora = require('../modelos/modeloBitacora');

exports.GuardarVenta = async (req, res) => {
    try {
        const { RTN_estado, ISV, descuento, UsuarioId } = req.body;

        const nuevaVenta = await Venta.create({
            RTN_estado,
            ISV,
            descuento,
            UsuarioId,
        });

        // Guardar entrada en la bitácora
        await Bitacora.create({
            accion: 'Se realizó una venta'
        });

        res.json({ mensaje: 'Venta guardada exitosamente', Venta: nuevaVenta });
        
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar la venta' });
    }
};

exports.EditarVenta = async (req, res) => {
    try {
        const { id } = req.query;
        const buscarVenta = await Venta.findOne({ where: { id: id } });

        if (!buscarVenta) {
            res.json({ msj: 'El id de la venta no existe' });
        } else {
            buscarVenta.set(req.body);
            await buscarVenta.save();
            res.json(buscarVenta);
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar la venta' });
    }
};

exports.ListarVentas = async (req, res) => {
    try {
        const listaVentas = await Venta.findAll();
        res.json(listaVentas);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de ventas' });
    }
};

exports.EliminarVenta = async (req, res) => {
    const { id } = req.query;
    try {
        const buscarVenta = await Venta.findOne({ where: { id: id } });

        if (!buscarVenta) {
            res.json({ msj: 'El id de la venta no existe' });
        } else {
            await Venta.destroy({ where: { id: id } });
            res.json({ mensaje: 'Venta eliminada exitosamente' });
        }
    } catch (error) {
        console.error(error);
        res.json({ msj: 'Error de Servidor' });
    }
};
