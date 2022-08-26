var pool = require('./bd');


async function getNovedades(numeropagina){
    var query = 'select * from nft limit '+ numeropagina + ",8";
    var rows = await pool.query(query);
    return rows;

};
async function getNovedadesTotal(){
    var query = 'select * from nft';
    var rows = await pool.query(query);
    return rows;

};

async function insertNovedad(obj){
    try {
        var query = 'insert into nft set ? ';
        var rows = await pool.query(query, [obj])
        return rows;
    } catch (error) {
        console.log(error)
        throw(error)
    }

};

async function deleteNFTById(id){
    var query = 'delete from nft where id = ?';
    var rows = await pool.query(query, [id]);
    return rows
};


async function getNovedadesById(id) {
    var query = 'select * from nft where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
};

async function modificarNovedadesById(obj, id) {
    try{
        var query = 'update nft set ? where id= ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }
    catch (error){
        throw error;
    }
    
}


module.exports = {getNovedades, insertNovedad, deleteNFTById, getNovedadesById , modificarNovedadesById, getNovedadesTotal}