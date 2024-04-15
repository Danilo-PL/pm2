const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../configuraciones/passport');

router.post('/login', autenticarUsuario, (req, res) => {
    
});

module.exports = router;
