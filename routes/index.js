var express = require('express');
var router = express.Router();

var nodemailer = require('nodemailer')
var noticiasModel = require('../models/noticiasModels');
var cloudinary = require('cloudinary').v2;


/* GET home page. */
router.get('/', async function(req, res, next) {
noticias = await noticiasModel.getNoticias();
noticias = noticias.splice(0,5);
noticias=noticias.map(noticias=> {
    if(noticias.img_id){
    const imagen = cloudinary.url(noticias.img_id,{
      width: 460,
      crop:'fill'
    });
    return{
      ...noticias,
      imagen
    }
    } else {
      return {
        ...noticias,
        imagen:'/imagenes/noimage.jpg'
      }
    }
  });
  res.render('index',{
      noticias
    });
});

router.post('/', async (req,res,next)=> {
  
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var telefono = req.body.tel;
  var mensaje = req.body.mensaje;

  
  var obj = {
  to:'alessoaxel@gmail.com',
  subject:'contacto desde la web',
  html:nombre + "" + apellido + "se contacto a traves y quiere mas info a este corre: " + email + "<br> Ademas , hizo el siguiente comentario:" + mensaje + ".<br> su tel es " + telefono
  }

  
var transporter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    auth: {
      user:process.env.SMTP_USER,
      pass:process.env.SMTP_PASS,
    }
})//CIERRA TRANSPORRER

var info = await transporter.sendMail(obj);

res.render('index',{
  message:'Mensaje enviado correctamente',
});

}); // cierra peticion del post




module.exports = router;

