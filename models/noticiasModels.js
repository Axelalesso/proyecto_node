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




module.exports = {getNoticias , deleteNoticiasById}