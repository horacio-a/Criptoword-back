var express = require('express');
var router = express.Router();
var usuarioModel = require('../../models/usuarioModel')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout'
  })
});

router.get('/logout', function (req, res, next){
  req.session.destroy();
  res.render('admin/login', {
    layout: 'admin/layout'
  })
})


router.post('/', async (req, res, next) => {
  try {
    var usuario = req.body.usuario;
    
    var password = req.body.password;

    var data = await usuarioModel.getUserByUsernameAndPassword(usuario, password);
    
    if(data != undefined) {
      req.session.id_usuario =  data.id;
      req.session.nombre = data.usuario;
      
      res.redirect('/admin/novedades')
    } else{
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      })
    }
  } catch (error) {
    console.log(error);

  }
} )

router.get('/agregar', async function (req, res, next) {

  res.render('admin/nuevousuario', {
      layout: 'admin/layout',

  })
});


// router.post('/agregar', async (req, res, next) => {
//   try {
//       if (req.body.usuario != "" && req.body.contraseña != "") {
//           await usuarioModel.insertUsuario({
//               ...req.body
//           });
//           res.redirect('/admin/novedades')
//       } else {
//           res.render('mineria/agregar', {
//               layout: 'mineria/layout',
//               error: true,
//               message: "alguno de los campos requeridos no fue cargado"
//           })
//       }
//   } catch (error) {
//       console.log(error)
//       res.render('admin/login/agregar', {
//           layout: "mineria/layout",
//           error: true,
//           message: "No se cargo con exito el equipo"
//       })
//   }
// });



module.exports = router;
