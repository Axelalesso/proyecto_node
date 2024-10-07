var pool = require('./bd');

async function getNoticias() {
var query = "select * from novedades order by id desc";
var rows = await pool.query(query);
return rows;
}

async function deleteNoticiasById(id) {
 var query = "delete from novedades where id = ?";
 var rows = await pool.query(query,[ id] );
 return rows;  
}

async function insertNoticias(obj){
    try{
        var query = "insert into noticias set ?";
        var rows = await pool.query(query, [obj]);
        return rows ;
        
        
    }catch(error){
        console.log(error);
        throw error ;
    }   
}

async function getNoticiasById(id) {
    var query="select * from noticias where id = ?";
    var rows = await pool.query (query , [id] );
    return rows [0];
}

async function modificarNoticiasById(obj , id) {
    try {
        var query = "update noticias set ? where id=?";
        var rows = await pool.query(query, [obj , id]);
        return rows;
        
    } catch (error){
        throw error;
    }
}

module.exports = {getNoticias , deleteNoticiasById , insertNoticias , getNoticiasById , modificarNoticiasById}

