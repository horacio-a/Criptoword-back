var pool = require('./bd');


async function getMineria(numeropagina){
    var query = 'select * from mineria limit ' + numeropagina + ",8";
    var rows = await pool.query(query);
    return rows;

};

async function getMineriaTotal(){
    var query = 'select * from mineria';
    var rows = await pool.query(query);
    return rows;

};


async function insertMineria(obj){
    try {
        var query = 'insert into mineria set ? ';
        var rows = await pool.query(query, [obj])
        return rows;
    } catch (error) {
        console.log(error)
        throw(error)
    }

};

async function deleteMineriaById(id){
    var query = 'delete from mineria where id = ?';
    var rows = await pool.query(query, [id]);
    return rows
};


async function getMineriaById(id) {
    var query = 'select * from mineria where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
};

async function modificarMineriaById(obj, id) {
    try{
        var query = 'update mineria set ? where id= ?';
        var rows = await pool.query(query, [obj, id]);
        console.log(rows)
        return rows;
    }
    catch (error){
        throw error;
    }
    
}


module.exports = {getMineria, insertMineria, deleteMineriaById, getMineriaById,getMineriaTotal  , modificarMineriaById}