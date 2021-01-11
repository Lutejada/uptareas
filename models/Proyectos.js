const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

// importo slug para dar estilo a las url
const slug = require('slug');

//Agrego libreria para insertar id unico a la url
const shortid = require('shortid');

//Agrego la conexion a la base de datos.
const db = require('../config/db');

//Defino el modelo con sus campos.
const Proyectos = db.define('proyectos', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre:{
    type:Sequelize.STRING
  },
  url:{
    type: Sequelize.STRING
  }

},{
    hooks: {
      beforeCreate(proyecto){

        const url = slug(proyecto.nombre).toLowerCase();
        
        
        proyecto.url = `${url}-${shortid.generate()}`;
      }
    }
});

module.exports = Proyectos;