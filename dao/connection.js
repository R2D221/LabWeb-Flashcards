var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'developer',
  password : 'password'
});

connection.connect();
var profesor = { usuario:'Jorge Torres', contrasena:'Jorge123'
};

inser('Profesor',profesor);

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.end();

// la consulta debe tener el formato var consulta = { atributo : 'valor' };

function inser(tabla, consulta){
    connection.query('insert into ' + tabla + 'set ?' + consulta);
}

function select(tabla, condicion){
   connection.query('select from ' + tabla + 'where' + condicion );
}