const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const RolesEmpleados = db.define(
    'RolesEmpleados',
    {
        descripcion: {
            type: sequelize.STRING(50),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'La descripción del rol es obligatoria.',
                },
                len: {
                    args: [1, 50],
                    msg: 'La descripción del rol debe tener entre 1 y 50 caracteres.',
                },
            },
            comment: 'Descripción del rol',
        },
    },
    {
        tableName: 'RolesEmpleados',
        timestamps: false,
        comment: 'Tabla para almacenar roles de empleados',
    }
);



module.exports = RolesEmpleados;
