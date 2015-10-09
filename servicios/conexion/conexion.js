var mysql      = require('mysql');
var conexion = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : '<your database name>'
});

conexion.connect();
conexion.end();