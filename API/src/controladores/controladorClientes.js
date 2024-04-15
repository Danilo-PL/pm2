const ModeloCliente = require('../modelos/modeloClientes');
const { validationResult } = require("express-validator");
const { Op } = require("sequelize");


exports.Listar = async (req, res) => {
    const listaClientes = await ModeloCliente.findAll();
    res.json(listaClientes);
}
exports.Buscarid = async (req, res) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerrors = "";
        validacion.errors.forEach(r => {
            msjerrors = msjerrors + r.msg + ". ";
        })
        res.json({ msj: "Hay errores en la peticion", error: msjerrors })
    }
    else {
        try {
            const listaClientes = await ModeloCliente.findAll({
                where: { id: req.query.id }
            });
            res.json(listaClientes);
        } catch (error) {
            res.json(error);
        }
    }
}
exports.BuscarPrimerNombre = async (req, res) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerrors = "";
        validacion.errors.forEach(r => {
            msjerrors = msjerrors + r.msg + ". ";
        })
        res.json({ msj: "Hay errores en la peticion", error: msjerrors })
    }
    else {
        try {
            const listaClientes = await ModeloCliente.findAll({
                where: { primernombre: req.query.filtro }
            });
            res.json(listaClientes);
        } catch (error) {
            res.json(error);
        }
    }
}
exports.BuscarPrimerApellido = async (req, res) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerrors = "";
        validacion.errors.forEach(r => {
            msjerrors = msjerrors + r.msg + ". ";
        })
        res.json({ msj: "Hay errores en la peticion", error: msjerrors })
    }
    else {
        try {
            const listaClientes = await ModeloCliente.findAll({
                where: { primerapellido: req.query.filtro }
            });
            res.json(listaClientes);
        } catch (error) {
            res.json(error);
        }
    }
}
exports.Buscar = async (req, res) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerrors = "";
        validacion.errors.forEach(r => {
            msjerrors = msjerrors + r.msg + ". ";
        })
        res.json({ msj: "Hay errores en la peticion", error: msjerrors })
    }
    else {
        try {
            const listaClientes = await ModeloCliente.findAll({
                where: {
                    [Op.or]: [
                        {primernombre: req.query.filtro } ,
                        {segundoNombre: req.query.filtro } ,
                        {primerapellido: req.query.filtro } ,
                        {segundoapellido: req.query.filtro } ,


                    ]
                }
            });
            res.json(listaClientes);
        } catch (error) {
            res.json(error);
        }
    }
}
exports.Guardar = async (req, res) => {
    const datos = req.body;
    const { identidad, primernombre, telefono_cliente, segundonombre, primerapellido, segundoapellido, genero, Estado } = req.body;
    await ModeloCliente.create({
        identidad: identidad,
        primernombre: primernombre,
        segundonombre: segundonombre,
        primerapellido: primerapellido,
        segundoapellido: segundoapellido,
        telefono_cliente: telefono_cliente,
        genero: genero,
        Estado: Estado
    }).then((data) => {
        res.json(data);
    }).catch((er) => {
        res.json(er);
    });

}

exports.Editar = async (req, res) => {
    const { id } = req.query;
    const { identidad, primerNombre, telefono, segundoNombre, PrimerApellido, SegundoApellido, genero, estado } = req.body;
    try {
        var Buscarcliente = await ModeloCliente.findOne({ where: { id: id } });
        if (!Buscarcliente) {
            res.json({ msj: "El id del cliente no existe" });
        }
        else {
            Buscarcliente.identidad = identidad;
            Buscarcliente.primernombre = primerNombre;
            Buscarcliente.telefono_cliente = telefono;
            Buscarcliente.segundonombre = segundoNombre;
            Buscarcliente.primerapellido = PrimerApellido;
            Buscarcliente.segundoapellido = SegundoApellido;
            Buscarcliente.Estado = estado;
            Buscarcliente.genero = genero;
            await Buscarcliente.save()
                .then((data) => {
                    res.json(data);
                }).catch((er) => {
                    res.json(er);
                });
        }
        await ModeloCliente.create({
            identidad: identidad,
            primernombre: primerNombre,
            telefono_cliente: telefono,
            segundonombre: segundoNombre,
            primerapellido: PrimerApellido,
            segundoapellido: SegundoApellido,
            genero: genero,
            Estado: estado
        }).then((data) => {
            res.json(data);
        }).catch((er) => {
            res.json(er);
        });
    }

    catch (error) {
        console.log(error);
        res.json({ msj: "Error de Servidor" })
    }
}
exports.Eliminar = async (req, res) => {
    const { id } = req.query;
    try {
        var Buscarcliente = await ModeloCliente.findOne({ where: { id: id } });
        if (!Buscarcliente) {
            res.json({ msj: "El id del cliente no existe" });
        }
        else {
            await ModeloCliente.destroy({ where: { id: id } })
                .then((data) => {
                    res.json(data);
                }).catch((er) => {
                    res.json(er);
                });
        }

    }

    catch (error) {
        console.log(error);
        res.json({ msj: "Error de Servidor" })
    }
}