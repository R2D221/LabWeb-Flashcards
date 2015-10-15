var express    = require('express');
var bodyParser = require('body-parser')
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'ldmpt24*',
  database : 'Flashcards'
});

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public_html'));

app.get('/', function(req, res){
   res.sendFile(__dirname + '/public_html/Inicio.html'); 
});

app.post('/nuevoProfesor', function(req, res){
    var nom = req.body.nombre;
    var user = req.body.usuario;
    var pass = req.body.password;
    var profesor = {usuario: user, nombre: nom, contrasena: pass};
    connection.connect();
    var query = connection.query('insert into Profesor set ?', profesor, function (err, result) {
        connection.end();
        if (!err){
            console.log("Sali de la query");
            
            res.sendFile(__dirname + '/public_html/Inicio.html');
        } else {
            console.log("Hubo error.");
        }
    });
});

app.listen(3000);
console.log("Running on port 3000...");
