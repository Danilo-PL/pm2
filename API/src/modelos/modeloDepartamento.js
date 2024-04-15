const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const Departamentos = db.define(
    'Departamentos',
    {
        nombreDepartamento: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'El nombre del departamento es obligatorio.',
                },
                len: {
                    args: [1, 50],
                    msg: 'El nombre del departamento debe tener entre 1 y 50 caracteres.',
                },
            },
            comment: 'Nombre del departamento',
        },
    },
    {
        tableName: 'Departamentos',
        timestamps: false,
        comment: 'Tabla para almacenar información de departamentos',
    }
);

module.exports = Departamentos;
