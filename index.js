const express = require('express');
const routes = require('./routes');
const path = require('path');
const { join } = require('path');
const bodyparser = require('body-parser');
const expressvalidator = require('express-validator');

//Helpers con algunas funciones
const helpers = require('./helpers');


// Creae la conexion a la db
const db = require('./config/db');

const Proyectos = require('./models/Proyectos');

db.authenticate()
  .then(() => console.log('Estoy conectado'))
  .catch(error => console.log(error));

//Creo la Tabla proyectos  
db.sync()
  .then(() => console.log('Estoy conectado'))
  .catch(error => console.log(error));  

// Crea una app de express
const app = express();

// Agregamos express validator a toda la aplicacion
//app.use(expressvalidator());


// Donde cargar los archivos estaticos
app.use(express.static('public'));

// habilitar pug
app.set('view engine', 'pug');

// Añadir la Carpetra de las Vistas
app.set('views', path.join(__dirname, './views'));

//añadir el vardump a la aplicacion
app.use((req,res,next) => {
  res.locals.vardump = helpers.vardump;
  next();
})

// Añadir bodyparser para leer datos del formulario
app.use(bodyparser.urlencoded({extended: true}));


app.use('/', routes());

app.listen(3000);