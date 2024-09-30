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


module.exports = router;