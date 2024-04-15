const {Router} = require('express');
const rutas = Router();
rutas.get('/',(req, res)=>{
    const objeto = {
        titulo: 'API Movil II',
        seccion: '1601',
        docente: 'Carlos Flores'
    }
    res.json(objeto);
});
rutas.get('/otra',(req, res)=>{
    const objeto = {
        titulo: 'Otra',
        seccion: '1601',
        docente: 'Carlos Flores'
    }
    res.json(objeto);
});
rutas.get('/wasaa',(req, res)=>{
    const objeto = {
        titulo: 'hola',
        seccion: '1601',
        docente: 'Carlos Flores'
    }
    res.json(objeto);
});
module.exports = rutas;