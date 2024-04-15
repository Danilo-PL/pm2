const { validationResult } = require('express-validator');
const Envios = require('../modelos/modeloEnvio');

exports.GuardarEnvio = async (req, res) => {
    try {
        const { direccion, CiudadeId, VentumId, EmpresasEnvioId } = req.body;

        const nuevoEnvio = await Envios.create({
            direccion,
            CiudadeId,
            VentumId,
            EmpresasEnvioId,
        });

        res.json({ mensaje: 'Envío guardado exitosamente', envio: nuevoEnvio });
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar el envío' });
    }
};

exports.EditarEnvio = async (req, res) => {
    try {
        const { id } = req.query;
        const { direccion, CiudadeId, VentumId, EmpresasEnvioId } = req.body;

        const buscarEnvio = await Envios.findOne({ where: { id: id } });

        if (!buscarEnvio) {
            res.json({ msj: 'El id del envío no existe' });
        } else {
            buscarEnvio.direccion = direccion;
            buscarEnvio.CiudadeId = CiudadeId;
            buscarEnvio.VentumId = VentumId;
            buscarEnvio.EmpresasEnvioId = EmpresasEnvioId;

            await buscarEnvio.save()
                .then((data) => {
                    res.json(data);
                })
                .catch((er) => {
                    res.json(er);
                });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar el envío' });
    }
};

exports.ListarEnvios = async (req, res) => {
    try {
        const listaEnvios = await Envios.findAll();
        res.json(listaEnvios);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de envíos' });
    }
};

exports.EliminarEnvio = async (req, res) => {
    const { id } = req.query;
    try {
        var buscarEnvio = await Envios.findOne({ where: { id: id } });

        if (!buscarEnvio) {
            res.json({ msj: 'El id del envío no existe' });
        } else {
            await Envios.destroy({ where: { id: id } })
                .then((data) => {
                    res.json(data);
                })
                .catch((er) => {
                    res.json(er);
                });
        }
    } catch (error) {
        console.error(error);
        res.json({ msj: 'Error de Servidor' });
    }
};
