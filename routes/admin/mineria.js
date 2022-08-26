var express = require('express');
var router = express.Router();
var mineriaModel = require('../../models/mineriaModel')
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy)



router.get('/', async function (req, res, next) {
    var mineria = await mineriaModel.getMineria(0);
    mineria = mineria.map(mineria => {
        if (mineria.img_id) {
            const img_id = cloudinary.image(mineria.img_id, {
                width: 50,
                height: 50,
                crop: 'fill'
            });
            return {
                ...mineria,
                img_id
            }
        } else {
            return {
                ...mineria,
                img_id: ''
            }
        }
    });
    res.render('mineria/mineria', {
        layout: 'mineria/layout',
        persona: req.session.nombre,
        mineria,

    })
});

router.get('/2', async function (req, res, next) {
    var mineria = await mineriaModel.getMineria(8);
    mineria = mineria.map(mineria => {
        if (mineria.imagen) {
            const imagen = cloudinary.image(mineria.imagen, {
                width: 50,
                height: 50,
                crop: 'fill'
            });
            return {
                ...mineria,
                imagen
            }
        } else {
            return {
                ...mineria,
                imagen: ''
            }
        }
    });

    res.render('mineria/mineria', {
        layout: 'mineria/layout',
        persona: req.session.nombre,
        mineria,

    })
});

router.get('/3', async function (req, res, next) {
    var mineria = await mineriaModel.getMineria(16);
    mineria = mineria.map(mineria => {
        if (mineria.imagen) {
            const imagen = cloudinary.image(mineria.imagen, {
                width: 50,
                height: 50,
                crop: 'fill'
            });
            return {
                ...mineria,
                imagen
            }
        } else {
            return {
                ...mineria,
                imagen: ''
            }
        }
    });

    res.render('mineria/mineria', {
        layout: 'mineria/layout',
        persona: req.session.nombre,
        mineria,

    })
});





router.get('/agregar', async function (req, res, next) {

    res.render('mineria/agregar', {
        layout: 'mineria/layout',

    })
});


router.post('/agregar', async (req, res, next) => {
    try {
        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).public_id;
        }

        if (req.body.nombre != "" && req.body.precio != "" &&
            req.body.potencia != "" && req.body.unidadpotencia != "" 
            && req.body.tipo != "" && req.body.ganancia != ""
            && req.body.consumo != "") {
            await mineriaModel.insertMineria({
                ...req.body,
                img_id
            });
            res.redirect('/admin/mineria')
        } else {
            res.render('mineria/agregar', {
                layout: 'mineria/layout',
                error: true,
                message: "alguno de los campos requeridos no fue cargado"
            })
        }
    } catch (error) {
        console.log(error)
        res.render('mineria/agregar', {
            layout: "mineria/layout",
            error: true,
            message: "No se cargo con exito el equipo"
        })
    }
});



router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;

    let mineria = await mineriaModel.deleteMineriaById(id);
    if (mineria.imagen) {
        await (destroy(mineria.imagen))
    }
    await mineriaModel.deleteMineriaById(id);
    res.redirect('/admin/mineria')
})


// trae el nft por id para despues modificarlo

router.get('/editar/:id', async (req, res, next) => {
    var id = req.params.id;

    var mineria = await mineriaModel.getMineriaById(id);

    res.render('mineria/editar', {
        layout: 'mineria/layout',
        mineria
    })
});

// modifica el equipo
router.post('/editar', async (req, res, next) => {
    try {

        let img_id = req.body.img_original;
        let borrar_img_vieja = false;
        if (req.body.img_delete === '1') {
            img_id = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }
        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        }
        var obj = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            potencia: req.body.potencia,
            unidadpotencia: req.body.unidadpotencia,
            img_id,
            tipo: req.body.tipo,
            ganancia: req.body.ganancia,
            consumo: req.body.consumo,


        }
        console.log(obj)
        await mineriaModel.modificarMineriaById(obj, req.body.id);
        res.redirect('/admin/mineria')
    }
    catch (error) {
        res.redirect('/admin/mineria/editar'), {
            layout: 'mineria/layout',
            error: true,
            message: 'No se modifico el NFT vuelva a interntarlo'
        }

    }
})






module.exports = router;
