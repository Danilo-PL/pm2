const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const sequelize = require("sequelize");
const Usuarios = require('../modelos/modeloUsuario');
const multer = require('multer');
const fs = require('fs');
const { log } = require('console');
const path = require('path');
const { guardarImagenUsuarios } = require('../configuraciones/usuarios');

// Guardar Usuario
exports.GuardarUsuario = async (req, res) => {
    try {
        const { nombreUsuario, correoElectronico, contraseña, clienteId, EmpleadoId } = req.body;

        const nuevoUsuario = await Usuarios.create({
            nombreUsuario,
            correoElectronico,
            contraseña,
            clienteId,
            EmpleadoId,
        });

        res.json({ mensaje: 'Usuario guardado exitosamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al guardar el usuario' });
    }
};

// Editar Usuario
exports.EditarUsuario = async (req, res) => {
    try {
        const { id } = req.query;
        const { nombreUsuario, correoElectronico, contraseña, pin, intentos, estado, clienteId, EmpleadoId } = req.body;

        const buscarUsuario = await Usuarios.findOne({ where: { id: id } });

        if (!buscarUsuario) {
            res.json({ msj: 'El id del usuario no existe' });
        } else {
            buscarUsuario.nombreUsuario = nombreUsuario;
            buscarUsuario.correoElectronico = correoElectronico;
            buscarUsuario.contraseña = contraseña;
            buscarUsuario.pin = pin;
            buscarUsuario.intentos = intentos;
            buscarUsuario.estado = estado;
            buscarUsuario.clienteId = clienteId;
            buscarUsuario.EmpleadoId = EmpleadoId;

            await buscarUsuario.save()
                .then((data) => {
                    res.json(data);
                })
                .catch((er) => {
                    res.json(er);
                });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Error al actualizar el usuario' });
    }
};

// Listar Usuarios
exports.ListarUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await Usuarios.findAll();
        res.json(listaUsuarios);
    } catch (error) {
        res.json({ error: 'Error al obtener la lista de usuarios' });
    }
};

// Eliminar Usuario
exports.EliminarUsuario = async (req, res) => {
    const { id } = req.query;
    try {
        var buscarUsuario = await Usuarios.findOne({ where: { id: id } });

        if (!buscarUsuario) {
            res.json({ msj: 'El id del usuario no existe' });
        } else {
            await Usuarios.destroy({ where: { id: id } })
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

exports.validarImagen = (req, res, next) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerror = "";
        validacion.errors.forEach(r => { // Cambio de validacion.error a validacion.errors
            msjerror = msjerror + r.msg + ". "; // Cambio de r.msj a r.msg
        });
        res.json({ msj: "Hay errores en la petición", error: msjerror });
    } else {
        guardarImagenUsuarios(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.json({ msj: "Hay errores al cargar la imagen", error: err });
            } else if (err) {
                res.json({ msj: "Hay errores al cargar la imagen", error: err });
            } else {
                next();
            }
        });
    }
};

exports.actualizarImagen = async (req, res) => {
    try {
        const validacion = validationResult(req);
        if (!validacion.isEmpty()) {
            const msjerror = validacion.errors.map(error => error.msg).join('. ');
            return res.json({ msj: "Hay errores en la petición", error: msjerror });
        }

        const { id } = req.query;
        const nombreImagen = req.file.filename;
        const buscarUsuario = await Usuarios.findOne({ where: { id: id } });

        if (!buscarUsuario) {
            return res.json({ msj: "El id del usuario no existe" });
        }

        let imagenAnteriorPath;
        if (buscarUsuario.imagen) {
            imagenAnteriorPath = path.join(__dirname, '../../public/img/usuarios/', buscarUsuario.imagen);
        }

        if (imagenAnteriorPath && fs.existsSync(imagenAnteriorPath)) {
            fs.unlinkSync(imagenAnteriorPath);
            console.log("Imagen anterior eliminada");
        }

        const imagenNuevaPath = path.join(__dirname, '../../public/img/usuarios/', nombreImagen);
        if (fs.existsSync(imagenNuevaPath)) {
            buscarUsuario.imagen = nombreImagen;
            await buscarUsuario.save();
            return res.json(buscarUsuario);
        } else {
            return res.json({ msj: "La imagen nueva no existe" });
        }
    } catch (error) {
        console.error("Error al actualizar imagen del usuario:", error);
        return res.status(500).json({ msj: "Error interno del servidor" });
    }
};


