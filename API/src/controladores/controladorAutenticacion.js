const modeloUsuarios = require('../modelos/modeloUsuario');
const modeloEmpleados = require('../modelos/modeloEmpleados');
const modeloClientes = require('../modelos/modeloClientes');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const passport = require('../configuraciones/passport');
const {getToken} = require ('../configuraciones/passport');

exports.IniciarSesion = async (req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        var msj = [];
        console.log(validacion);
        validacion.errors.forEach(element => {
            console.log(element.msg);
            console.log(element.param);
            msj.push({ msj: element.msg, parametro: element.param });
        });
        res.json(msj);
    }
    else{
        const { nombreusuario, contraseña } = req.body;
        const buscarUsuario = await modeloUsuarios.findOne({
            attributes: ['id','nombreUsuario', 'correoElectronico', 'contraseña'],
            include: [{
                model: modeloEmpleados,
                attributes: ['nom_empleado', 'apellido_empleado']
            }, {
                model: modeloClientes,
                attributes: ['primernombre', 'primerapellido']
            }],
            where: { nombreUsuario: nombreusuario }
        });
        if(!buscarUsuario){
            res.json({msj: 'El usuario o contrasena son incorrectas'});
        }
        else{
            if(buscarUsuario.VerificarContrasena(contraseña, buscarUsuario.contraseña)){
                const token = getToken({id: buscarUsuario.id});
                res.json({
                    token,
                    usu: {
                        nombre: buscarUsuario.nombreUsuario, // Cambiado de BuscarUsuario a buscarUsuario
                        correo: buscarUsuario.correoElectronico, // Cambiado de BuscarUsuario a buscarUsuario
                        empleado: buscarUsuario.Empleado, // Cambiado de BuscarUsuario a buscarUsuario
                        cliente: buscarUsuario.Cliente // Cambiado de BuscarUsuario a buscarUsuario
                    }
                });
            }
            else{
                res.json({msj: 'El usuario o contrasena son incorrectas'});
            }
            
        }
    }
};

exports.Error = (req, res) =>{
    res.json({msj: 'Debe enviar las credenciales correctas'});
};
