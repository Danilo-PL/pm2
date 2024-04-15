const { validationResult } = require('express-validator');
const RolesEmpleados = require('../modelos/modeloRolesEmpleados');

exports.GuardarRolEmpleado = async (req, res) => {
    try {
        const { descripcion } = req.body;

        const nuevoRolEmpleado = await RolesEmpleados.create({
            descripcion,
        });

        res.json({ mensaje: 'Rol de empleado guardado exitosamente', rolEmpleado: nuevoRolEmpleado });
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar el rol de empleado' });
    }
};

exports.EditarRolEmpleado = async (req, res) => {
    try {
        const { id } = req.query;
        const { descripcion } = req.body;

        const buscarRolEmpleado = await RolesEmpleados.findOne({ where: { id: id } });

        if (!buscarRolEmpleado) {
            res.json({ msj: 'El id del rol de empleado no existe' });
        } else {
            buscarRolEmpleado.descripcion = descripcion;

            await buscarRolEmpleado.save()
                .then((data) => {
                    res.json(data);
                })
                .catch((er) => {
                    res.json(er);
                });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar el rol de empleado' });
    }
};

exports.ListarRolesEmpleados = async (req, res) => {
    try {
        const listaRolesEmpleados = await RolesEmpleados.findAll();
        res.json(listaRolesEmpleados);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de roles de empleados' });
    }
};

exports.EliminarRolEmpleado = async (req, res) => {
    const { id } = req.query;
    try {
        var buscarRolEmpleado = await RolesEmpleados.findOne({ where: { id: id } });

        if (!buscarRolEmpleado) {
            res.json({ msj: 'El id del rol de empleado no existe' });
        } else {
            await RolesEmpleados.destroy({ where: { id: id } })
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
