const  sequelize  = require('sequelize');
const db = require('../configuraciones/db');

const Proveedores = db.define(
    'Proveedores',
    {
        
        nom_prov: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El nombre del proveedor es obligatorio.',
                },
                len: {
                    args: [1, 50],
                    msg: 'El nombre del proveedor debe tener entre 1 y 50 caracteres.',
                },
            },
            comment: 'Nombre del proveedor',
        },
        telefono_prov: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El número de teléfono del proveedor es obligatorio.',
                },
                len: {
                    args: [1, 50],
                    msg: 'El número de teléfono del proveedor debe tener entre 1 y 50 caracteres.',
                },
            },
            comment: 'Número de teléfono del proveedor',
        },
        correo_prov: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El correo electrónico del proveedor es obligatorio.',
                },
                isEmail: {
                    msg: 'El correo electrónico debe ser válido.',
                },
            },
            comment: 'Correo electrónico del proveedor',
        },
        direccion_prov: {
            type: sequelize.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'La dirección del proveedor es obligatoria.',
                },
                len: {
                    args: [1, 100],
                    msg: 'La dirección del proveedor debe tener entre 1 y 100 caracteres.',
                },
            },
            comment: 'Dirección del proveedor',
        },
        Estado: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            comment: 'Estado del proveedor',
        },
    },
    {
        tableName: 'Proveedores',
        timestamps: false,
        comment: 'Tabla para almacenar información de proveedores',
    }
);


module.exports = Proveedores;