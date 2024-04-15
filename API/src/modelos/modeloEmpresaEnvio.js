const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const EmpresasEnvio = db.define(
    'EmpresasEnvio',
    {
        nombre_empresa: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El nombre de la empresa es obligatorio.',
                },
                len: {
                    args: [1, 50],
                    msg: 'El nombre de la empresa debe tener entre 1 y 50 caracteres.',
                },
            },
        },
        direccion_empresa: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'La dirección de la empresa es obligatoria.',
                },
                len: {
                    args: [1, 50],
                    msg: 'La dirección de la empresa debe tener entre 1 y 50 caracteres.',
                },
            },
        },
        telefono_empresa: {
            type: sequelize.STRING(15),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El teléfono de la empresa es obligatorio.',
                },
                len: {
                    args: [1, 15],
                    msg: 'El teléfono de la empresa debe tener entre 1 y 15 caracteres.',
                },
            },
        },
        id_ciudad: {
            type: sequelize.INTEGER,
            allowNull: false,
        },
        estado: {
            type: sequelize.BOOLEAN,
            defaultValue: 1, 
        },
        correo_empresa: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El correo de la empresa es obligatorio.',
                },
                isEmail: {
                    msg: 'El correo de la empresa debe ser una dirección de correo electrónico válida.',
                },
            },
        },
    },
    {
        tableName: 'EmpresasEnvio',
        timestamps: false,
    }
);

module.exports = EmpresasEnvio;
