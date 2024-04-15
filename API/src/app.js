const express = require('express');
const morgan = require('morgan');
const db = require(`./configuraciones/db`);
const ModeloCliente = require('./modelos/modeloClientes.js');
const ModeloProducto = require('./modelos/modeloProductos.js');
const ModeloCompra = require('./modelos/modeloCompra.js');
const ModeloCiudad = require('./modelos/modeloCiudad.js');
const ModeloCategoria = require('./modelos/modeloCategoria.js');
const ModeloDepartamento = require('./modelos/modeloDepartamento.js');
const ModeloDetalleCompras = require('./modelos/modeloDetalleCompra.js');
const ModeloDetallesVentas = require('./modelos/modeloDetalleVenta.js');
const ModeloEmpleados = require('./modelos/modeloEmpleados.js');
const ModeloEmpresaEnvios = require('./modelos/modeloEmpresaEnvio.js');
const ModeloEnvios = require('./modelos/modeloEnvio.js');
const ModeloProveedores = require('./modelos/modeloProveedores.js');
const ModeloRolesEmpleados = require('./modelos/modeloRolesEmpleados.js');
const ModeloUsuario = require('./modelos/modeloUsuario.js');
const ModeloVentas = require('./modelos/modeloVentas.js');
const ModeloBitacora = require('./modelos/modeloBitacora.js');
const path = require('path');

db.authenticate()
.then(async()=>{
    console.log("Se conecto al servidor de la basde de datos");
    ModeloCategoria.hasMany(ModeloProducto);
    ModeloProducto.belongsTo(ModeloCategoria);
    ModeloDepartamento.hasMany(ModeloCiudad);
    ModeloCiudad.belongsTo(ModeloDepartamento);
    ModeloCiudad.hasMany(ModeloCliente);
    ModeloCliente.belongsTo(ModeloCiudad);
    ModeloProveedores.hasMany(ModeloCompra);
    ModeloCompra.belongsTo(ModeloProveedores);
    ModeloEmpleados.hasMany(ModeloCompra);
    ModeloCompra.belongsTo(ModeloEmpleados);
    ModeloCompra.hasMany(ModeloDetalleCompras);
    ModeloDetalleCompras.belongsTo(ModeloCompra);
    ModeloProducto.hasMany(ModeloDetalleCompras);
    ModeloDetalleCompras.belongsTo(ModeloProducto);
    ModeloVentas.hasMany(ModeloDetallesVentas);
    ModeloDetallesVentas.belongsTo(ModeloVentas);
    ModeloProducto.hasMany(ModeloDetallesVentas);
    ModeloDetallesVentas.belongsTo(ModeloProducto);
    ModeloCiudad.hasMany(ModeloEnvios);
    ModeloEnvios.belongsTo(ModeloCiudad);
    ModeloVentas.hasMany(ModeloEnvios);
    ModeloEnvios.belongsTo(ModeloVentas);
    ModeloEmpresaEnvios.hasMany(ModeloEnvios);
    ModeloEnvios.belongsTo(ModeloEmpresaEnvios);
    ModeloRolesEmpleados.hasMany(ModeloEmpleados);
    ModeloEmpleados.belongsTo(ModeloRolesEmpleados);
    ModeloCiudad.hasMany(ModeloEmpleados);
    ModeloEmpleados.belongsTo(ModeloCiudad);
    ModeloCiudad.hasMany(ModeloProveedores);
    ModeloProveedores.belongsTo(ModeloCiudad);
    ModeloCliente.hasOne(ModeloUsuario);
    ModeloUsuario.belongsTo(ModeloCliente);
    ModeloEmpleados.hasOne(ModeloUsuario);
    ModeloUsuario.belongsTo(ModeloEmpleados);
    ModeloUsuario.hasMany(ModeloVentas);
    ModeloVentas.belongsTo(ModeloUsuario);
    ModeloUsuario.hasMany(ModeloBitacora);
    ModeloBitacora.belongsTo(ModeloUsuario);

    await ModeloDepartamento.sync().then(()=>{
        console.log('Modelo Departamento generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloCiudad.sync().then(()=>{
        console.log('Modelo Ciudad generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloCliente.sync().then(()=>{
        console.log('Modelo Cliente generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloCategoria.sync().then(()=>{
        console.log('Modelo Categoria generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloProducto.sync().then(()=>{
        console.log('Modelo Productos generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloProveedores.sync().then(()=>{
        console.log('Modelo Proveedores generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloRolesEmpleados.sync().then(()=>{
        console.log('Modelo RolesEmpleados generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloEmpleados.sync().then(()=>{
        console.log('Modelo Empleados generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloCompra.sync().then(()=>{
        console.log('Modelo Compra generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloDetalleCompras.sync().then(()=>{
        console.log('Modelo DetalleCompra generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloEmpresaEnvios.sync().then(()=>{
        console.log('Modelo EmpresasEnvios generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloUsuario.sync().then(()=>{
        console.log('Modelo Usuario generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloVentas.sync().then(()=>{
        console.log('Modelo Ventas generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloDetallesVentas.sync().then(()=>{
        console.log('Modelo DetalleVentas generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloEnvios.sync().then(()=>{
        console.log('Modelo Envios generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
    await ModeloBitacora.sync().then(()=>{
        console.log('Modelo bitacoras generado correctamente');
    })
    .catch((er) => {
        console.log(er);
    });
})
const app = express();
app.set('port', 3001);
app.use(morgan('common'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/',require('./rutas'))
app.use('/api/imagenes', express.static(path.join(__dirname,'../public/img')));
app.use('/api/clientes',require('./rutas/rutasClientes.js'))
app.use('/api/producto',require('./rutas/rutasProductos.js'))
app.use('/api/compra',require('./rutas/rutasCompras.js'))
app.use('/api/ciudad',require('./rutas/rutasCiudades.js'))
app.use('/api/categoria',require('./rutas/rutasCategorias.js'))
app.use('/api/departamento',require('./rutas/rutasDepartamentos.js'))
app.use('/api/detallecompra',require('./rutas/rutasDetalleCompras.js'))
app.use('/api/detalleventa',require('./rutas/rutasDetalleVentas.js'))
app.use('/api/empleados',require('./rutas/rutasEmpleados.js'))
app.use('/api/empresaenvio',require('./rutas/rutasEmpresaEnvios.js'))
app.use('/api/envio',require('./rutas/rutasEnvios.js'))
app.use('/api/proveedores',require('./rutas/rutasProveedores.js'))
app.use('/api/roles',require('./rutas/rutasRolesEmpleados.js'))
app.use('/api/usuario',require('./rutas/rutasUsuarios.js'))
app.use('/api/ventas',require('./rutas/rutasVentas.js'))
app.use('/api/login',require('./rutas/rutasAutenticacion.js'))

app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciando en el puerto ' + app.get ('port'));
});


