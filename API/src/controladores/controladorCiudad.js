const Ciudades = require('../modelos/modeloCiudad');
const { validationResult } = require("express-validator");

exports.GuardarCiudad = async (req, res) => {
    try {
        const { nombre_ciudad, codigoPostal, DepartamentoId } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            const nuevaCiudad = await Ciudades.create({
                nombre_ciudad,
                codigoPostal,
                DepartamentoId,
            });

            res.json({ mensaje: 'Ciudad guardada exitosamente', ciudad: nuevaCiudad });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar la ciudad' });
    }
};

exports.EditarCiudad = async (req, res) => {
    try {
        const { id } = req.query;
        const { nombre_ciudad, codigoPostal, DepartamentoId } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            // Buscar la ciudad
            const buscarCiudad = await Ciudades.findOne({ where: { id: id } });

            if (!buscarCiudad) {
                res.json({ msj: "El id de la ciudad no existe" });
            } else {
                // Actualizar información de la ciudad
                buscarCiudad.nombre_ciudad = nombre_ciudad;
                buscarCiudad.codigoPostal = codigoPostal;
                buscarCiudad.DepartamentoId = DepartamentoId;

                // Guardar la actualización
                await buscarCiudad.save()
                    .then((data) => {
                        res.json(data);
                    }).catch((er) => {
                        res.json(er);
                    });
            }
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar la ciudad' });
    }
};

exports.ListarCiudades = async (req, res) => {
    try {
        const listaCiudades = await Ciudades.findAll();
        res.json(listaCiudades);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de ciudades' });
    }
};

exports.EliminarCiudad = async (req, res) => {
    const { id } = req.query;
    try {
        // Buscar la ciudad
        const buscarCiudad = await Ciudades.findOne({ where: { id: id } });

        if (!buscarCiudad) {
            res.json({ msj: "El id de la ciudad no existe" });
        } else {
            // Eliminar la ciudad
            await Ciudades.destroy({ where: { id: id } })
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
