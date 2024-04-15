const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../configuraciones/db');

const Usuarios = db.define(
    'Usuarios',
    {
        nombreUsuario: {
            type: sequelize.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'El nombre de usuario es obligatorio.',
                },
                len: {
                    args: [1, 50],
                    msg: 'El nombre de usuario debe tener entre 1 y 50 caracteres.',
                },
            },
            comment: 'Nombre de usuario',
        },
        correoElectronico: {
            type: sequelize.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'El correo electrónico es obligatorio.',
                },
                isEmail: {
                    msg: 'El correo electrónico debe ser válido.',
                },
            },
            comment: 'Correo electrónico',
        },
        contraseña: {
            type: sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'La contraseña es obligatoria.',
                },
                len: {
                    args: [6, 255], 
                    msg: 'La contraseña debe tener al menos 6 caracteres.',
                },
            },
            comment: 'Contraseña',
        },
        pin: {
            type: sequelize.STRING(6), 
            allowNull: true, 
            comment: 'PIN',
        },
        intentos: {
            type: sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
            comment: 'Número de intentos de inicio de sesión',
        },
        estado: {
            type: sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
            comment: 'Estado del usuario',
        },
        imagen: {
            type: sequelize.STRING(250),
            allowNull: true,
        },

    },
    {
        tableName: 'Usuarios',
        timestamps: false,
        comment: 'Tabla para almacenar información de usuarios',
        hooks: {
            beforeCreate: async (usuario, options) => {
                // Encriptar la contraseña antes de crear el usuario
                const hashedPassword = await bcrypt.hash(usuario.contraseña, 10);
                usuario.contraseña = hashedPassword;
            }
        }
    }
);
Usuarios.prototype.VerificarContrasena = (con, com)=>{
    console.log(con);
    console.log(com);
    return bcrypt.compareSync(con, com);
}
Usuarios.prototype.CifrarContrasena = (con)=>{
    console.log(con);
    const hash = bcrypt.hashSync(con, 10);
    return hash;
}

module.exports = Usuarios;
