const { validationResult } = require('express-validator');
const Proveedores = require('../modelos/modeloProveedores');

exports.GuardarProveedor = async (req, res) => {
    try {
        const { nom_prov, telefono_prov, correo_prov, direccion_prov, Estado, CiudadeId } = req.body;

        const nuevoProveedor = await Proveedores.create({
            nom_prov,
            telefono_prov,
            correo_prov,
            direccion_prov,
            Estado,
            CiudadeId,
        });

        res.json({ mensaje: 'Proveedor guardado exitosamente', proveedor: nuevoProveedor });
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar el proveedor' });
    }
};

exports.EditarProveedor = async (req, res) => {
    try {
        const { id } = req.query;
        const { nom_prov, telefono_prov, correo_prov, direccion_prov, Estado, CiudadeId } = req.body;

        const buscarProveedor = await Proveedores.findOne({ where: { id: id } });

        if (!buscarProveedor) {
            res.json({ msj: 'El id del proveedor no existe' });
        } else {
            buscarProveedor.nom_prov = nom_prov;
            buscarProveedor.telefono_prov = telefono_prov;
            buscarProveedor.correo_prov = correo_prov;
            buscarProveedor.direccion_prov = direccion_prov;
            buscarProveedor.Estado = Estado;
            buscarProveedor.CiudadeId = CiudadeId;

            await buscarProveedor.save()
                .then((data) => {
                    res.json(data);
                })
                .catch((er) => {
                    res.json(er);
                });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar el proveedor' });
    }
};

exports.ListarProveedores = async (req, res) => {
    try {
        const listaProveedores = await Proveedores.findAll();
        res.json(listaProveedores);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de proveedores' });
    }
};

exports.EliminarProveedor = async (req, res) => {
    const { id } = req.query;
    try {
        var buscarProveedor = await Proveedores.findOne({ where: { id: id } });

        if (!buscarProveedor) {
            res.json({ msj: 'El id del proveedor no existe' });
        } else {
            await Proveedores.destroy({ where: { id: id } })
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
