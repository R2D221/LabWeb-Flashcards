var express    = require('express');
var bodyParser = require('body-parser')
var mysql      = require('mysql');
var session    = require('express-session');

var pool = mysql.createPool({
    connectionLimit : 50,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'ldmpt24*',
    database : 'Flashcards',
    debug    :  false
});

var app = express();

app.use(session({secret: 'secretoDeChola'}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public_html'));

var sess;

app.get('/', function(req, res){
   res.sendFile(__dirname + '/public_html/Inicio.html'); 
});


app.get('/entrada', function(req, res){
    res.render('homeProfesor.ejs', {usuario: sess.usuario});
});

app.get('/agregarPregunta', function(req, res){
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        connection.query('SELECT * FROM Grupo WHERE id_profesor = ?', sess.idProfesor, function(err,rows){
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
    sess = req.session;
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
                sess.idProfesor = idProf;
            }else{
                console.log('Hubo error.');
            }
        });

        connection.on('error', function(err) {      
              res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
              return;     
        });
    });
    sess.usuario = user;
    res.render('homeProfesor.ejs', {usuario: sess.usuario});
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
    var prof = sess.idProfesor;
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
    var descrip = req.body.descripcion;
    var opA = req.body.opcionA;
    var opB = req.body.opcionB;
    var opC = req.body.opcionC;
    var opD = req.body.opcionD;
    var respuesta = req.body.respuesta;
    var categoria = req.body.categoria;
    var pregunta = {id_grupo: grupo,
        descripcion: descrip,
        categoria: categoria,
        A: opA,
        B: opB,
        C: opC,
        D: opD,
        respuesta: respuesta};
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        var query = connection.query('insert into Pregunta set ?', pregunta, function(err,rows){
            connection.release();
            if(!err){
                console.log('Se guardo la pregunta.');
                res.send('success');
            }else{
                console.log('Hubo error en el insertado.');
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
