const express = require('express');
const router = express.Router();

// Importar express validator
const { body } = require('express-validator');

// Importe el controlador

const proyectosControler = require('../controlers/proyectosController');

// funcion para utilizar las rutas desde el controlador

module.exports = function(){
    router.get('/', proyectosControler.proyectosHoma);

    router.get('/nuevo-proyecto', proyectosControler.formularioproyecto);

    router.post('/nuevo-proyecto', 
    body('nombre').not().isEmpty().escape(),  // validando con express validator
    proyectosControler.nuevoProyecto);

    // Listar Proyecto
    router.get('/proyecto/:url', proyectosControler.proyectoPorurl);

    // Actualizar Proyecto
    router.get('/proyecto/editar/:id', proyectosControler.formularioEditar);
    router.post('/nuevo-proyecto/:id', 
    body('nombre').not().isEmpty().escape(),  // validando con express validator
    proyectosControler.actualizarProyecto);

    return router;
};


