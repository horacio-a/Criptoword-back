var express = require('express');
var router = express.Router();
var novedadesModel = require('./../../models/nft-novedades');
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy)



router.get('/', async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades(0);
  novedades = novedades.map(novedades => {
    if (novedades.img_id) {
      const imagen = cloudinary.image(novedades.img_id, {
        width: 50,
        height: 50,
        crop: 'fill'
      });
      return {
        ...novedades,
        imagen
      }
    } else {
      return {
        ...novedades,
        imagen: ''
      }
    }
  });

  res.render('admin/novedades', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    novedades,
    
  })
});

router.get('/2', async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades(8);
  novedades = novedades.map(novedades => {
    if (novedades.img_id) {
      const imagen = cloudinary.image(novedades.img_id, {
        width: 50,
        height: 50,
        crop: 'fill'
      });
      return {
        ...novedades,
        imagen
      }
    } else {
      return {
        ...novedades,
        imagen: ''
      }
    }
  });

  res.render('admin/novedades', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    novedades,
    
  })
});

router.get('/3', async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades(16);
  novedades = novedades.map(novedades => {
    if (novedades.img_id) {
      const imagen = cloudinary.image(novedades.img_id, {
        width: 50,
        height: 50,
        crop: 'fill'
      });
      return {
        ...novedades,
        imagen
      }
    } else {
      return {
        ...novedades,
        imagen: ''
      }
    }
  });

  res.render('admin/novedades', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    novedades,
    
  })
});





router.get('/agregar', async function (req, res, next) {

  res.render('admin/agregar', {
    layout: 'admin/layout',

  })
});


router.post('/agregar', async (req, res, next) => {
  try {
    var img_id = '';
    if( req.files && Object.keys(req.files).length>0) {
      console.log(req.files.imagen)
      console.log(Object.keys(req.files))
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }
    
    if (req.body.nombre != "" && req.body.precio != "" &&
      req.body.coleccion != "") {
      await novedadesModel.insertNovedad({
        ...req.body,
        img_id
      });
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true,
        message: "alguno de los campos requeridos no fue cargado"
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: "admin/layout",
      error: true,
      message: "No se cargo con exito el nft"
    })
  }
});

router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;

  let novedad = await novedadesModel.getNovedadesById(id);
  if (novedad.img_id){
    await(destroy(novedad.img_id))
  }
  await novedadesModel.deleteNFTById(id);
  res.redirect('/admin/novedades')
})


// trae el nft por id para despues modificarlo

router.get('/editar/:id', async (req, res, next) => {
  var id = req.params.id;

  var NFT = await novedadesModel.getNovedadesById(id);

  res.render('admin/editar', {
    layout: 'admin/layout',
    NFT
  })
});

// modifica el nft
router.post('/editar', async (req, res, next) => {
  try{

    let img_id = req.body.img_original;
    let borrar_img_vieja = false;
    if( req.body.img_delete === '1') {
      img_id = null;
      borrar_img_vieja = true;
    } else {
      if (req.files && Object.keys(req.files).length > 0 ) {
        imagen = req.files.imagen;
        img_id = (await uploader(imagen.tempFilePath)).public_id;
        borrar_img_vieja = true;
      }
    }
    if (borrar_img_vieja && req.body.img_original){
      await (destroy(req.body.img_original));
    }
    var obj = {
      nombre: req.body.nombre,
      precio: req.body.precio,
      coleccion: req.body.coleccion,
      propietario: req.body.propietario,
      img_id,
      moneda: req.body.moneda,
      

    }
  

    await novedadesModel.modificarNovedadesById(obj, req.body.id);
    res.redirect('/admin/novedades')
  }
  catch(error){
    res.redirect('admin/editar'), {
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico el NFT vuelva a interntarlo'
    }

  }
})






module.exports = router;
