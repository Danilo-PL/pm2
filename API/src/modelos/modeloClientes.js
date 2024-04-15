const sequelize = require('sequelize');
const db = require('../configuraciones/db')
const Cliente = db.define(
    'cliente',
    {
        identidad: {
            type: sequelize.STRING(13),
            allowNull:false,
            unique: {
                args:true,
                msg: "Ya esta registrado el numero de identidad"

            },
            validate: {
                notEmpty: {msg: "Debe escribir el numero de identidad"}
            }
        },
        primernombre: {
            type: sequelize.STRING(50),
            allowNull:false,
            validate: {
                notEmpty: {msg: "Debe escribir el nombre"}
            }
        },
        segundonombre: {
            type: sequelize.STRING(50),
            allowNull:true,
        },
        primerapellido: {
            type: sequelize.STRING(50),
            allowNull:false,
            validate: {
                notEmpty: {msg: "Debe escribir el primer apellido"}
            }
        },
        segundoapellido: {
            type: sequelize.STRING(50),
            allowNull:true,
        },
        genero: {
            type: sequelize.ENUM('M', 'F'),
            allowNull:false
        },
        telefono_cliente: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El número de teléfono del cliente es obligatorio.',
                },
                len: {
                    args: [1, 50],
                    msg: 'El número de teléfono del cliente debe tener entre 1 y 50 caracteres.',
                },
            },
            comment: 'Número de teléfono del cliente',
        },
        Estado: {
            type: sequelize.BOOLEAN,
            allowNull:true,
            defaultValue: true 
        }
    },
    {
        tableName: 'clientes',
        timestamps: true
    }
);

module.exports = Cliente;