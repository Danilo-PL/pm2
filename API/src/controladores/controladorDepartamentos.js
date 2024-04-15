const Departamentos = require('../modelos/modeloDepartamento');
const { validationResult } = require("express-validator");

exports.GuardarDepartamento = async (req, res) => {
    try {
        const { nombreDepartamento } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            const errores = validacion.array().map(error => error.msg);
            res.json({ msj: "Hay errores en la petición", errores });
        } else {
            const nuevoDepartamento = await Departamentos.create({
                nombreDepartamento,
            });

            res.json({ mensaje: 'Departamento guardado exitosamente', departamento: nuevoDepartamento });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar el departamento' });
    }
};

exports.EditarDepartamento = async (req, res) => {
    try {
        const { id } = req.query;
        const { nombreDepartamento } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            const errores = validacion.array().map(error => error.msg);
            res.json({ msj: "Hay errores en la petición", errores });
        } else {
            // Buscar el departamento
            const buscarDepartamento = await Departamentos.findOne({ where: { id: id } });

            if (!buscarDepartamento) {
                res.json({ msj: "El id del departamento no existe" });
            } else {
                // Actualizar información del departamento
                buscarDepartamento.nombreDepartamento = nombreDepartamento;

                // Guardar la actualización
                await buscarDepartamento.save()
                    .then((data) => {
                        res.json(data);
                    }).catch((er) => {
                        res.json(er);
                    });
            }
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar el departamento' });
    }
};

exports.ListarDepartamentos = async (req, res) => {
    try {
        const listaDepartamentos = await Departamentos.findAll();
        res.json(listaDepartamentos);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de departamentos' });
    }
};

exports.EliminarDepartamento = async (req, res) => {
    const { id } = req.query;
    try {
        
        var buscarDepartamento = await Departamentos.findOne({ where: { id: id } });

        if (!buscarDepartamento) {
            res.json({ msj: "El id del departamento no existe" });
        } else {
            
            await Departamentos.destroy({ where: { id: id } })
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
