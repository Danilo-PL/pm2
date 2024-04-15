const Categorias = require('../modelos/modeloCategoria');
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");

exports.GuardarCategoria = async (req, res) => {
    try {
        const { descripcion_categoria } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            const nuevaCategoria = await Categorias.create({
                descripcion_categoria,
            });

            res.json({ mensaje: 'Categoría guardada exitosamente', categoria: nuevaCategoria });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar la categoría' });
    }
};

exports.EditarCategoria = async (req, res) => {
    try {
        const { id } = req.query;
        const { descripcion_categoria } = req.body;

        // Validación
        const validacion = validationResult(req);
        if (validacion.errors.length > 0) {
            var msjerror = "";
            validacion.errors.forEach(r => {
                msjerror = msjerror + r.msg + ". ";
            });
            res.json({ msj: "Hay errores en la petición", error: msjerror });
        } else {
            // Buscar la categoría
            const buscarCategoria = await Categorias.findOne({ where: { id: id } });

            if (!buscarCategoria) {
                res.json({ msj: "El id de la categoría no existe" });
            } else {
                // Actualizar información de la categoría
                buscarCategoria.descripcion_categoria = descripcion_categoria;

                // Guardar la actualización
                await buscarCategoria.save()
                    .then((data) => {
                        res.json(data);
                    }).catch((er) => {
                        res.json(er);
                    });
            }
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar la categoría' });
    }
};

exports.ListarCategorias = async (req, res) => {
    try {
        const listaCategorias = await Categorias.findAll();
        res.json(listaCategorias);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de categorías' });
    }
};

exports.EliminarCategoria = async (req, res) => {
    const { id } = req.query;
    try {
        
        var buscarCategoria = await Categorias.findOne({ where: { id: id } });

        if (!buscarCategoria) {
            res.json({ msj: "El id de la categoría no existe" });
        } else {
            
            await Categorias.destroy({ where: { id: id } })
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
