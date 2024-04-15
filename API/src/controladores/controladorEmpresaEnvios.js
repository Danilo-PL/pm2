const EmpresasEnvio = require('../modelos/modeloEmpresaEnvio');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

exports.GuardarEmpresaEnvio = async (req, res) => {
    try {
        const { nombre_empresa, direccion_empresa, telefono_empresa, id_ciudad, estado, correo_empresa } = req.body;

        const nuevaEmpresaEnvio = await EmpresasEnvio.create({
            nombre_empresa,
            direccion_empresa,
            telefono_empresa,
            id_ciudad,
            estado,
            correo_empresa,
        });

        res.json({ mensaje: 'Empresa de envío guardada exitosamente', empresa_envio: nuevaEmpresaEnvio });
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar la empresa de envío' });
    }
};

exports.EditarEmpresaEnvio = async (req, res) => {
    try {
        const { id } = req.query;
        const { nombre_empresa, direccion_empresa, telefono_empresa, id_ciudad, estado, correo_empresa } = req.body;

        // Buscar la empresa de envío
        const buscarEmpresaEnvio = await EmpresasEnvio.findOne({ where: { id: id } });

        if (!buscarEmpresaEnvio) {
            res.json({ msj: 'El id de la empresa de envío no existe' });
        } else {
            // Actualizar información de la empresa de envío
            buscarEmpresaEnvio.nombre_empresa = nombre_empresa;
            buscarEmpresaEnvio.direccion_empresa = direccion_empresa;
            buscarEmpresaEnvio.telefono_empresa = telefono_empresa;
            buscarEmpresaEnvio.id_ciudad = id_ciudad;
            buscarEmpresaEnvio.estado = estado;
            buscarEmpresaEnvio.correo_empresa = correo_empresa;

            // Guardar la actualización
            await buscarEmpresaEnvio.save()
                .then((data) => {
                    res.json(data);
                })
                .catch((er) => {
                    res.json(er);
                });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar la empresa de envío' });
    }
};

exports.ListarEmpresasEnvio = async (req, res) => {
    try {
        const listaEmpresasEnvio = await EmpresasEnvio.findAll();
        res.json(listaEmpresasEnvio);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de empresas de envío' });
    }
};

exports.EliminarEmpresaEnvio = async (req, res) => {
    const { id } = req.query;
    try {
        // Buscar la empresa de envío
        const buscarEmpresaEnvio = await EmpresasEnvio.findOne({ where: { id: id } });

        if (!buscarEmpresaEnvio) {
            res.json({ msj: 'El id de la empresa de envío no existe' });
        } else {
            // Eliminar la empresa de envío
            await EmpresasEnvio.destroy({ where: { id: id } })
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
