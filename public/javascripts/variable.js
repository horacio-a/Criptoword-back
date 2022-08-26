var fun = require('../../models/nft-novedades')

const pagina = 0



async function pagina1(){
    pagina = 0
    fun.getNovedades

}  

async function pagina2(){
    pagina = 8
    fun.getNovedades

}  

async function pagina3(){
    pagina = 16
    fun.getNovedades

}  

module.exports = {pagina}, {pagina1}, {pagina2}, {pagina3};