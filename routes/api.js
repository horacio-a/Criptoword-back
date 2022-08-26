var express = require('express');
var router = express.Router();
var novedadesModel = require('../models/nft-novedades');
var mineriaModel = require('../models/mineriaModel')
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');


router.post('/contacto', async (req, res,) =>{
    const mail = {
        to: 'horaciomatiasalbornoz@gmail.com',
        subject: `contacto Criptoword, ${req.body.asunto}`,
        html: `${req.body.nombre} ${req.body.apellido} se contacto y te dejo el siguieten mail <br> ${req.body.mensaje} <br> para contactarte con el utiliza este mail ${req.body.contacto} y su numero es ${req.body.numero}`,
    }
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    await transport.sendMail(mail)
    res.status(201).json({
        error: false,
        message: 'Mensaje enviado'
    })
})


router.get('/NFT', async function(req, res, next) {
    let nft = await novedadesModel.getNovedadesTotal();
    

    nft = nft.map(nft => {

        if(nft.img_id){
            const  imagen = cloudinary.url(nft.img_id, {
                width: 500,
                height: 500,
                crop: 'fill'
            });
            return{
                ...nft,
                imagen
            }

        }else{
         return{   
            ...nft,
            imagen: ''
         }
        }
    }
    
    );
        
    return res.json(nft)

    
});

router.get('/mineria', async function(req, res, next) {
    let mineria = await mineriaModel.getMineriaTotal();
    

    mineria = mineria.map(mineria => {

        if(mineria.img_id){
            const  imagen = cloudinary.url(mineria.img_id, {
                width: 500,
                height: 500,
                crop: 'fill'
            });
            return{
                ...mineria,
                imagen
            }

        }else{
         return{   
            ...mineria,
            imagen: ''
         }
        }
    }
    
    );
        
    return res.json(mineria)

    
});

module.exports =router;