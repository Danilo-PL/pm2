const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const Envio = db.define(
    'Envio',
    {
        direccion: {
            type: sequelize.STRING(100),
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'La dirección es obligatoria.',
                },
                len: {
                    args: [1, 100],
                    msg: 'La dirección debe tener entre 1 y 100 caracteres.',
                },
            },
            comment: 'Dirección de envío',
        },
    },
    {
        tableName: 'Envios',
        timestamps: false,
    }
);

module.exports = Envio;
