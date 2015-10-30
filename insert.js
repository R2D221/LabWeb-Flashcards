var express    = require('express');
var bodyParser = require('body-parser');
var mysql      = require('mysql');
var session    = require('client-sessions');
var multer     = require('multer');
var fs         = require('fs');
var dateFormat = require('dateformat');
var async      = require('async');
var path       = require('path');
var mime       = require('mime');

var downdir = __dirname + '/public_html/uploads';

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
  activeDuration: 10 * 60 * 1000
}));
app.use(multer({ dest: downdir}).single('archivo'));

app.get('/', function(req, res){
   res.sendFile(__dirname + '/public_html/Inicio.html'); 
});

app.get('/crearGrupo', function(req, res){
   res.render('registrarGrupo.ejs', {usuario: req.session.usuario});
});

app.get('/alumnos', function(req, res){
   res.render('registrarAlumno.ejs', {usuario: req.session.usuario});
});

app.get('/profesor', function(req, res){
   res.render('registrarProfesor.ejs', {usuario: req.session.usuario});
});

app.get('/asigAlum', function(req, res){
    async.waterfall([
        function(callback) {
            pool.getConnection(function(err,connection){
                if (err) {
                  connection.release();
                  res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                  return;
                }   

                connection.query('SELECT * FROM Grupo', function(err,rows){
                    connection.release();
                    if(!err){
                        if(typeof rows[0] !== 'undefined'){
                            callback(null, rows);
                        }else{
                            callback(null, 'none');
                        }
                    }else{
                        console.log('Error al obtener grupos.');
                    }
                });

                connection.on('error', function(err) {      
                      res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                      return;     
                });
            });     
        }, function(arg1, callback){
            if(arg1 === 'none'){
                callback(null, 'none', 'none');
            }else{
                pool.getConnection(function(err,connection){
                    if (err) {
                      connection.release();
                      res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                      return;
                    }   

                    connection.query('SELECT * FROM Alumno', function(err,rows){
                        connection.release();
                        if(!err){
                            if(typeof rows[0] !== 'undefined'){
                                callback(null, arg1, rows);
                            }else{
                                callback(null, 'none', 'none');
                            }
                        }else{
                            console.log('Error al conseguir alumnos.');
                        }
                    });

                    connection.on('error', function(err) {      
                          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                          return;     
                    });
                });
            }
        }
    ], function(err, res1, res2){
        if(!err){
            res.render('asignaAlumno.ejs', {grupos: res1, alumnos: res2});
        }
    });
});

app.get('/entrada', function(req, res){
    res.render('homeProfesor.ejs', {usuario: req.session.usuario});
});

app.get('/administrador', function(req, res){
    res.render('homeAdministrador.ejs', {usuario: req.session.usuario});
});

app.get('/grupos', function(req, res){
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        connection.query('SELECT * FROM Grupo WHERE id_profesor = ?', req.session.idProfesor, function(err, rows){
            connection.release();
            if(!err){
                res.render('grupos.ejs', {grupos:rows, usuario:req.session.usuario});
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

app.get('/grupo_alumno', function(req, res){
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        connection.query('SELECT gru.id_grupo, nombre, descripcion FROM grupo AS gru, grupo_alumno AS gal WHERE gru.id_grupo = gal.id_grupo AND gal.id_alumno = ?;', req.session.idAlumno, function(err, rows){
            connection.release();
            if(!err){
                res.render('misGrupos.ejs', {grupos:rows, usuario:req.session.usuario});
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

app.get('/agregarMaterial', function(req, res){
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        connection.query('SELECT * FROM Grupo WHERE id_profesor = ?', req.session.idProfesor, function(err,rows){
            connection.release();
            if(!err){
                res.render('materiales.ejs', {grupos:rows});
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

app.post('/cambiosGrupo', function(req, res){
  pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        } 
        connection.query('SELECT * FROM Grupo WHERE id_grupo = ?', req.body.idGrupo, function(err, rows){
            connection.release();
            if(!err){
                var inicio=dateFormat(rows[0].fecha_inicio, "yyyy-mm-dd");
                var fin=dateFormat(rows[0].fecha_fin, "yyyy-mm-dd");
                rows[0].fecha_inicio = inicio;
                rows[0].fecha_fin = fin;
                res.render('cambiosGrupo.ejs', {grupos:rows, usuario:req.session.usuario});
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

app.post('/tomarExamen', function(req, res){
    var idGpo = req.body.idGrupo;
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        } 
        connection.query('SELECT * FROM Pregunta WHERE id_grupo = ?', idGpo, function(err, rows){
            connection.release();
            if(!err){
                res.send(JSON.stringify(rows));
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

app.post('/verMaterial', function(req, res){
  pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        } 
        connection.query('SELECT * FROM Referencias WHERE id_grupo = ?', req.body.idGrupo, function(err, rows){
            connection.release();
            if(!err){
                res.render('misMateriales.ejs', {referencias:rows, usuario:req.session.usuario});
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

app.post('/descargarMaterial', function(req, res){
    var file = __dirname + '/public_html/' + req.body.archivo;
    var nomAr = path.basename(file);
    var mimeTipo = mime.lookup(file);
    
    res.setHeader('Content-disposition', 'attachment; filename=' + nomAr);
    res.setHeader('Content-type', mimeTipo);
    
    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
});

app.post('/actualizarGrupo', function(req, res){
    var prof = req.session.idProfesor;
    var id_grupo = req.body.idgpo;
    var nom = req.body.nombre;
    var descrip = req.body.descripcion;
    var clave = req.body.clave;
    var ini = req.body.inicio;
    var fin = req.body.fin;

    console.log(ini);
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        var query = connection.query('Update Grupo SET ? where id_grupo = ?',[{nombre:nom, descripcion:descrip, clave_acceso:clave, fecha_inicio:ini, fecha_fin:fin},id_grupo],function(err,rows){
            connection.release();
            if(!err) {
                console.log('Se guardo el grupo.');
            } else {
                console.log('Hubo error en el insertado de actualizacion.');
                console.log(query);
              }
        });

        connection.on('error', function(err) {      
              res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
              return;     
        });
    });
    res.send('entrada');
});

app.post('/login', function(req, res){
    var user = req.body.usuario;
    var pass = req.body.password;
    var idProf, idAlum, idAdmin;
    async.waterfall([
        function(callback) {
            pool.getConnection(function(err,connection){
                if (err) {
                  connection.release();
                  res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                  return;
                }   

                connection.query('SELECT * FROM Profesor WHERE usuario = ? AND contrasena = ?', [user, pass], function(err,rows){
                    connection.release();
                    if(!err){
                        if(typeof rows[0] !== 'undefined'){
                            idProf = rows[0].id_profesor;
                            req.session.idProfesor = idProf;
                            req.session.usuario = user;
                            callback(null, 'profesor', 'entrada');
                        }else{
                            callback(null, 'none', 'Inicio.html');
                        }
                    }else{
                        console.log('Error al realizar log-in.');
                    }
                });

                connection.on('error', function(err) {      
                      res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                      return;     
                });
            });     
        }, function(arg1, arg2, callback){
            if(arg1 === 'profesor'){
                callback(null, 'profesor', arg2);
            }else{
                pool.getConnection(function(err,connection){
                    if (err) {
                      connection.release();
                      res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                      return;
                    }   

                    connection.query('SELECT * FROM Alumno WHERE usuario = ? AND contrasena = ?', [user, pass], function(err,rows){
                        connection.release();
                        if(!err){
                            if(typeof rows[0] !== 'undefined'){
                                idAlum = rows[0].id_alumno;
                                req.session.idAlumno = idAlum;
                                req.session.usuario = user;
                                callback(null, 'alumno', 'Home.html');
                            }else{
                                callback(null, 'none', 'Inicio.html');
                            }
                        }else{
                            console.log('Error al realizar log-in alumno.');
                        }
                    });

                    connection.on('error', function(err) {      
                          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                          return;     
                    });
                });
            }
        }, function(arg1, arg2, callback){
            if(arg1 === 'alumno' || arg1 === 'alumno' ){
                callback(null, arg2);
            }else{
                pool.getConnection(function(err,connection){
                    if (err) {
                      connection.release();
                      res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                      return;
                    }   

                    connection.query('SELECT * FROM Administrador WHERE usuario = ? AND password = ?', [user, pass], function(err,rows){
                        connection.release();
                        if(!err){
                            if(typeof rows[0] !== 'undefined'){
                                idAdmin = rows[0].idadministrador;
                                req.session.idAdministrador = idAdmin;
                                req.session.usuario = user;
                                callback(null, 'administrador');
                            }else{
                                callback(null, 'Inicio.html');
                            }
                        }else{
                            console.log('Error al realizar log-in administrador.');
                        }
                    });

                    connection.on('error', function(err) {      
                          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                          return;     
                    });
                });
            }
        }
    ], function(err, result){
        if(!err){
            res.send(result);
        }
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

app.post('/nuevoAlumno', function(req, res){
    var nom = req.body.nombre;
    var cor = req.body.correo;
    var user = req.body.usuario;
    var pass = req.body.password;
    var alumno = {nombre: nom, correo: cor, usuario: user, contrasena: pass};
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        connection.query('insert into Alumno set ?', alumno, function(err,rows){
            connection.release();
            if(!err) 
                console.log('Se registro al alumno.');
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
    console.log(req.body.noPreguntas);
    var respuestas = JSON.parse(req.body.resps);
    console.log(respuestas[0].descripcion);
    
    var values = [];
    var insertQuery  = 'insert into Pregunta(id_grupo, descripcion, categoria, A, B, C, D, respuesta) values ?';
    
    for(var i = 0; i < preguntas; i++){
        var pregunta = [grupo,respuestas[i].descripcion,respuestas[i].categoria,respuestas[i].opcionA,
            respuestas[i].opcionB, respuestas[i].opcionC, respuestas[i].opcionD, respuestas[i].respuesta];
        values[i] = pregunta;
    }
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        console.log(values);
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

app.post('/asignaAlumnos', function(req, res){
    var grupo = req.body.idGrupo;
    var alumnos = JSON.parse(req.body.alumnos);
    
    var values = [];
    var insertQuery  = 'insert into Grupo_alumno(id_grupo, id_alumno) values ?';
    
    for(var i = 0; i < alumnos.length; i++){
        var gru_al = [grupo,alumnos[i]];
        values[i] = gru_al;
    }
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        console.log(values);
        var query = connection.query(insertQuery, [values], function(err,rows){
            connection.release();
            console.log(values);
            if(!err){
                console.log('Se guardo la asignacion.');
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

app.post('/subirMaterial', function(req, res){
    console.log(req.body.nombre);
    var dateStuff = Date.now();
    var archivoDir = 'uploads/' + dateStuff + req.file.originalname;
    fs.readFile(req.file.path, function(err, data){
        var nuevoDir = __dirname + '/public_html/uploads/' + dateStuff + req.file.originalname;
        fs.writeFile(nuevoDir, data, function (err) { });
    });
    
    fs.unlink(req.file.path, function(err){ });
    
    var material = {id_grupo: req.body.grupo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        archivo: archivoDir,
        fecha_inicio: req.body.inicio,
        fecha_fin: req.body.fin
    }
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        var query = connection.query('insert into Referencias set ?', material, function(err,rows){
            connection.release();
            if(!err){
                console.log('Se guardo la referencia.');
                res.render('homeProfesor.ejs', {usuario: req.session.usuario});
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

app.listen(3000, function(){
    console.log("Running on port 3000...");
});
