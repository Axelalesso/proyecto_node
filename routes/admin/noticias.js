var express = require('express');
var router = express.Router();
var noticiasModel = require('../../models/noticiasModels');

router.get('/', async  function(req, res, next) {
    var noticias = await noticiasModel.getNoticias();
    res.render('admin/noticias', {
        layout:'admin/layout',
        usuario: req.session.nombre,
        noticias
        
    });
});

router.get('/eliminar/:id' , async (req , res , next)=>{
  var id = req.params.id;
  await noticiasModel.deleteNoticiasById(id);
  res.redirect('/admin/noticias')
});

router.get ('/agregar',(req,res,next)=>{
  res.render('admin/agregar',{
    layout:'admin/layout'
    });
  });

  router.post('/agregar', async (req , res , next)=>{
    try{
      
      if ( req.body.titulo !=""&& req.body.subtitulo !="" && req.body.cuerpo !=""){
        await noticiasModel.insertNoticias(req.body);
        res.redirect('/admin/noticias')
      } else{
        res.render('admin/agregar',{
          layout:'admin/layout',
            error: true, message: 'todos los campos son requeridos'
          })
        }
        
      }catch (error) {
        console.log(error)
        res.render('admin/agregar',{
          layout:'admin/layout',
          error: true, message:'no se cargo la novedad'
          });
        }
      });

router.get ('/modificar/:id' , async (req , res , next)=> {
  let id = req.params.id;
  let noticias = await noticiasModel.getNoticiasById(id);
  res.render ('admin/modificar', {
    layout: 'admin/layout',
    noticias
    });
});


router.post('/modificar', async (req , res , next) => {
  try{
    let obj={
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo,
      }

await noticiasModel.modificarNoticiasById(obj, req.body.id);
res.redirect('/admin/noticias');
}
catch(error){
  console.log (error)
  res.render('admin/modificar',{
    layout: 'admin/layout',
    error : true, message: 'No se modifico la noticia'
    })
  }
})

module.exports = router;