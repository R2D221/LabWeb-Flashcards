var express    = require('express');
var bodyParser = require('body-parser')
var mysql      = require('mysql');
var session    = require('client-sessions');

var pool = mysql.createPool({
    connectionLimit : 50,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'ldmpt24*',
    database : 'Flashcards',
    debug    :  false
});

var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public_html'));
app.use(session({
  cookieName: 'session',
  secret: 'SeCRet0DeCh0l4',
  duration: 20 * 60 * 1000,
  activeDuration: 10 * 60 * 1000,
}));

app.get('/', function(req, res){
   res.sendFile(__dirname + '/public_html/Inicio.html'); 
});


app.get('/entrada', function(req, res){
    res.render('homeProfesor.ejs', {usuario: req.session.usuario});
});

app.get('/agregarPregunta', function(req, res){
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        connection.query('SELECT * FROM Grupo WHERE id_profesor = ?', req.session.idProfesor, function(err,rows){
            connection.release();
            if(!err){
                res.render('preguntas.ejs', {grupos:rows});
            }else{
                console.log('Hubo error.');
            }
        });

        connection.on('error', function(err) {      
              res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
              return;     
        });
    });
});

app.post('/login', function(req, res){
    var user = req.body.usuario;
    var idProf;
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        connection.query('SELECT * FROM Profesor WHERE usuario = ?', user, function(err,rows){
            connection.release();
            if(!err){
                idProf = rows[0].id_profesor;
                req.session.idProfesor = idProf;
                req.session.usuario = user;
                res.render('homeProfesor.ejs', {usuario: req.session.idProfesor});
            }else{
                console.log('Error al realizar log-in.');
            }
        });

        connection.on('error', function(err) {      
              res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
              return;     
        });
    });
});

app.post('/nuevoProfesor', function(req, res){
    var nom = req.body.nombre;
    var user = req.body.usuario;
    var pass = req.body.password;
    var profesor = {usuario: user, nombre: nom, contrasena: pass};
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        connection.query('insert into Profesor set ?', profesor, function(err,rows){
            connection.release();
            if(!err) 
                console.log('Se registro el profesor.');
            else
                console.log('Hubo error.');
        });

        connection.on('error', function(err) {      
              res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
              return;     
        });
    });
    res.send('Inicio.html');
});

app.post('/nuevoGrupo', function(req, res){
    var prof = req.session.idProfesor;
    var nom = req.body.nombre;
    var descrip = req.body.descripcion;
    var clave = req.body.clave;
    var ini = req.body.inicio;
    var fin = req.body.fin;
    var grupo = {id_profesor: prof,
        nombre: nom,
        descripcion: descrip,
        clave_acceso: clave,
        fecha_inicio: ini,
        fecha_fin: fin};
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        var query = connection.query('insert into Grupo set ?', grupo, function(err,rows){
            connection.release();
            if(!err) 
                console.log('Se guardo el grupo.');
            else
                console.log('Hubo error en el insertado.');
        });

        connection.on('error', function(err) {      
              res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
              return;     
        });
    });
    res.send('entrada');
});

app.post('/nuevaPregunta', function(req, res){
    var grupo = req.body.grupo;
    var preguntas = parseInt(req.body.noPreguntas);
    var respuestas = JSON.parse(req.body.resps);
    
    var values = [];
    var insertQuery  = 'insert into Pregunta(id_grupo, descripcion, categoria, A, B, C, D, respuesta) values ?';
    
    for(var i = 0; i < preguntas; i++){
        var pregunta = [grupo,respuestas.preguntas[i].descripcion,respuestas.preguntas[i].categoria,respuestas.preguntas[i].opcionA,
            respuestas.preguntas[i].opcionB, respuestas.preguntas[i].opcionC, respuestas.preguntas[i].opcionD, respuestas.preguntas[i].respuesta];
        
        values[i] = pregunta;
    }
        
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        var query = connection.query(insertQuery, [values], function(err,rows){
            connection.release();
            console.log(values);
            if(!err){
                console.log('Se guardaron las preguntas.');
                res.send('success');
            }else{
                console.log('Hubo error en el insertado.');
                console.log(err);
            }
        });

        connection.on('error', function(err) {      
              res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
              return;     
        });
    });
});

app.listen(3000);
console.log("Running on port 3000...");
