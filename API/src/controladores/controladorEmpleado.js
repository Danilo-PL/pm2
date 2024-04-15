const Empleado = require('../modelos/modeloEmpleados');
const { validationResult } = require('express-validator');

exports.GuardarEmpleado = async (req, res) => {
    try {
        const { nom_empleado, apellido_empleado, telefono_empleado, direccion_empleado, RolesEmpleadoId, CiudadeId } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            const nuevoEmpleado = await Empleado.create({
                nom_empleado,
                apellido_empleado,
                telefono_empleado,
                direccion_empleado,
                RolesEmpleadoId,
                CiudadeId,
            });

            res.json({ mensaje: 'Empleado guardado exitosamente', empleado: nuevoEmpleado });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar el empleado' });
    }
};

exports.EditarEmpleado = async (req, res) => {
    try {
        const { id } = req.query;
        const { nom_empleado, apellido_empleado, telefono_empleado, direccion_empleado, Estado, RolesEmpleadoId, CiudadeId } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            // Buscar el empleado
            const buscarEmpleado = await Empleado.findOne({ where: { id: id } });

            if (!buscarEmpleado) {
                res.json({ msj: "El id del empleado no existe" });
            } else {
                // Actualizar información del empleado
                buscarEmpleado.nom_empleado = nom_empleado;
                buscarEmpleado.apellido_empleado = apellido_empleado;
                buscarEmpleado.telefono_empleado = telefono_empleado;
                buscarEmpleado.direccion_empleado = direccion_empleado;
                buscarEmpleado.Estado = Estado;
                buscarEmpleado.RolesEmpleadoId = RolesEmpleadoId;
                buscarEmpleado.CiudadeId = CiudadeId;

                // Guardar la actualización
                await buscarEmpleado.save()
                    .then((data) => {
                        res.json(data);
                    }).catch((er) => {
                        res.json(er);
                    });
            }
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar el empleado' });
    }
};

exports.ListarEmpleados = async (req, res) => {
    try {
        const listaEmpleados = await Empleado.findAll();
        res.json(listaEmpleados);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de empleados' });
    }
};

exports.EliminarEmpleado = async (req, res) => {
    const { id } = req.query;
    try {
        // Buscar el empleado
        const buscarEmpleado = await Empleado.findOne({ where: { id: id } });

        if (!buscarEmpleado) {
            res.json({ msj: "El id del empleado no existe" });
        } else {
            // Eliminar el empleado
            await Empleado.destroy({ where: { id: id } })
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
