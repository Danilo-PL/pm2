const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const Empleados = db.define(
    'Empleados',
    {
        nom_empleado: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El nombre del empleado es obligatorio.',
                },
                len: {
                    args: [1, 50],
                    msg: 'El nombre del empleado debe tener entre 1 y 50 caracteres.',
                },
            },
        },
        apellido_empleado: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El apellido del empleado es obligatorio.',
                },
                len: {
                    args: [1, 50],
                    msg: 'El apellido del empleado debe tener entre 1 y 50 caracteres.',
                },
            },
        },
        telefono_empleado: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El teléfono del empleado es obligatorio.',
                },
                len: {
                    args: [1, 50],
                    msg: 'El teléfono del empleado debe tener entre 1 y 50 caracteres.',
                },
            },
        },
        direccion_empleado: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'La dirección del empleado es obligatoria.',
                },
                len: {
                    args: [1, 50],
                    msg: 'La dirección del empleado debe tener entre 1 y 50 caracteres.',
                },
            },
        },
        Estado: {
            type: sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    },
    {
        tableName: 'Empleados',
        timestamps: false,
    }
);

module.exports = Empleados;
