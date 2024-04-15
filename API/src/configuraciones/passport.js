const passport = require('passport');
const ModeloUsuario = require('../modelos/modeloUsuario');
const jwtStrategia = require('passport-jwt').Strategy;
const extraerJWT = require('passport-jwt').ExtractJwt;
const JWT = require('jsonwebtoken');
const moment = require('moment');
const expiracionTiempo = moment.duration(10, 'days').asSeconds();
const miclave = 'Oseguera123';

exports.getToken = (datos) => {
    return JWT.sign(datos, miclave, {expiresIn: expiracionTiempo});
}

const opciones = {};
opciones.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = miclave;

exports.jwtPassport = passport.use(
    new jwtStrategia(opciones, async (payload,done) => {
        await ModeloUsuario.findOne({
            where: {id: payload.id, estado: 'AC'}
        }).then((data)=> {
            if(!data){
                return done (null, false);
            }
            else{
                const user = {
                    id: data.id,
                    
                }
                return done(null, user);
            }
        }).catch((er)=>{
            console.log(er);
            return done(null, false);
        });
    })
);

passport.serializeUser((ModeloUsuario, callback)=>{
    callback(null, ModeloUsuario);
});

passport.deserializeUser((ModeloUsuario, callback)=>{
    callback(null, ModeloUsuario);
});

exports.VerificarUsuario = passport.authenticate("jwt", {session: false,
failureRedirect: '/api/login/error'});