var express    = require("express");
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'Flashcards'
});

var app = express();

app.use(express.static(__dirname + '/public_html'));

app.listen(3000);
console.log("Running on port 3000...");

/*connection.connect();
var profesor = { usuario:'Jorge Torres', contrasena:'Jorge123'
};

var query = connection.query('insert into Profesor set ?', profesor, function (err, result) {
    console.log(query.sql);
}); */
// la consulta debe tener el formato var consulta = { atributo : 'valor' };
