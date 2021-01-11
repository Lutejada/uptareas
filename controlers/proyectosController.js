//Importo el modelo
const Proyectos = require('../models/Proyectos');

// Se exportan los controladores para ser llamados por el router

exports.proyectosHoma = async (req,res)=>{

    const proyectos = await Proyectos.findAll();

    res.render('index', {
        nombrePagina: ' Proyectos ',
        proyectos
    });
};

exports.formularioproyecto = async (req,res)=>{

    const proyectos = await Proyectos.findAll();

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
};


exports.nuevoProyecto = async (req,res)=>{
   // validamos que tengamos algo el el formulario

   const proyectos = await Proyectos.findAll();

   const { nombre } = req.body;

   let errores =[];

   if(!nombre){
       errores.push({'Texto':'Debes Agregar un Proyecto'})
   }

   if(errores.length > 0){
       res.render('nuevoProyecto', {
           nombrePagina:'Nuevo Proyecto',
           errores,
           proyectos
       })
   }else{
       // No Hay errores

       /*//Insertar en la base deatos
       Proyectos.create({ nombre })
       .then(()=>console.log('Insertado Correctamente'))
       .catch(error=>console.log(error))
       */
      
       // Con Async Await
       
       const proyecto = await  Proyectos.create({ nombre})
       res.redirect('/');
   }
};

exports.proyectoPorurl = async(req, res, next) => {
    
    const proyectos = await Proyectos.findAll();

    //consulto el proyecto para editar
    const proyecto  = await  Proyectos.findOne({
        where:  {
            url: req.params.url
        }
    });


    if(!proyecto){
        return next()
    }

    // Pasamos la vista
    res.render('Tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos
    })
};

exports.formularioEditar = async (req, res) => {
    
    const proyectos = await Proyectos.findAll();

    //consulto el proyecto para editar
    const proyecto = await Proyectos.findOne({
        where:  {
            id: req.params.id
        }
    });

    console.log('promesas cumplidas');

    // render a la vista
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    });
    
};

exports.actualizarProyecto = async (req,res)=>{
    // validamos que tengamos algo el el formulario
 
    const proyectos = await Proyectos.findAll();
 
    const { nombre } = req.body;
 
    let errores =[];
 
    if(!nombre){
        errores.push({'Texto':'Debes Agregar un Proyecto'})
    }
 
    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina:'Nuevo Proyecto',
            errores,
            proyectos
        })
    }else{
        // No Hay errores
 
        /*//Insertar en la base deatos
        Proyectos.create({ nombre })
        .then(()=>console.log('Insertado Correctamente'))
        .catch(error=>console.log(error))
        */
       
        // Con Async Await
        
        const proyecto = await  Proyectos.update(
            { nombre: nombre},
            {where:{
                id: req.params.id 
            }});
        res.redirect('/');
    }
 };