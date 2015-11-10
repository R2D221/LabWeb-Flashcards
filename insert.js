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
var _          = require('underscore');

var downdir = __dirname + '/public_html/uploads';

var pool = mysql.createPool({
    connectionLimit : 50,
    host     : '127.0.0.1',
    user     : 'root',
    password : 'ldmpt24*',
    database : 'FlashCards',
    multipleStatements: true,
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
            res.render('asignaAlumno.ejs', {grupos: res1, alumnos: res2, usuario: req.session.usuario});
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

app.get('/estadisticas', function(req, res){
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        connection.query('SELECT * FROM Grupo WHERE id_profesor = ?', req.session.idProfesor, function(err, rows){
            connection.release();
            if(!err){
                res.render('estadisticas.ejs', {grupos:rows, usuario:req.session.usuario});
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
    async.waterfall([
        function(callback) {
            pool.getConnection(function(err,connection){
                if (err) {
                  connection.release();
                  res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                  return;
                }   

                connection.query('SELECT DISTINCT gru.id_grupo, nombre, descripcion FROM grupo AS gru, grupo_alumno AS gal WHERE gru.id_grupo = gal.id_grupo AND gal.id_alumno = ?' + 
                        ' AND NOT exists(SELECT DISTINCT gru.id_grupo, nombre, descripcion FROM grupo AS gru, grupo_alumno AS gal, alumno_pregunta AS ap WHERE gru.id_grupo = gal.id_grupo AND ap.id_alumno = ? AND ap.id_grupo = gru.id_grupo);;',
                        [req.session.idAlumno,req.session.idAlumno], function(err, rows){
                    connection.release();
                    if(!err){
                        if(typeof rows[0] !== 'undefined'){
                            callback(null, rows);
                        }else{
                            var empty = [];
                            callback(null, empty);
                        }
                    }else{
                        console.log('Hubo error.');
                    }
                });

                connection.on('error', function(err) {      
                      res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                      return;     
                });
            });
        }, function(arg1, callback){
            pool.getConnection(function(err,connection){
                if (err) {
                  connection.release();
                  res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                  return;
                }   

                connection.query('SELECT DISTINCT gru.id_grupo, nombre, descripcion FROM grupo AS gru, grupo_alumno AS gal, alumno_pregunta AS ap WHERE gru.id_grupo = gal.id_grupo AND ap.id_alumno = ? AND ap.id_grupo = gru.id_grupo;', req.session.idAlumno, function(err, rows){
                    connection.release();
                    if(!err){
                        if(typeof rows[0] !== 'undefined'){
                            callback(null, arg1, rows);
                        }else{
                            var empty = [];
                            callback(null, arg1, empty);
                        }
                    }else{
                        console.log('Error al recopilar grupos respondidos.');
                    }
                });

                connection.on('error', function(err) {      
                      res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                      return;     
                });
            });
        }
    ], function(err, res1, res2){
        if(!err){
            res.render('misGrupos.ejs', {grupos:res1, consultas:res2, usuario:req.session.usuario});
        }
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
                res.render('preguntas.ejs', {grupos:rows, usuario:req.session.usuario});
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
                res.render('materiales.ejs', {grupos:rows, usuario:req.session.usuario});
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

app.post('/detalle', function(req, res){
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
                res.render('detalleGrupo.ejs', {grupos:rows, usuario:req.session.usuario});
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
    req.session.grupoAct = idGpo;
    
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
    res.send('/grupos');
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

              var query =  connection.query('SELECT * FROM Profesor WHERE usuario = ? AND contrasena = ?', [user, pass], function(err,rows){
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
            if(arg1 === 'alumno' || arg1 === 'profesor' ){
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
    var insertQuery = 'insert into Pregunta(id_grupo, descripcion, categoria, A, B, C, D, respuesta) values ?';
    var insertEstad = 'INSERT INTO Estadisticas_grupo(id_pregunta, respuesta, id_grupo, conteo) values ?'; 
    
    for(var i = 0; i < preguntas; i++){
        var pregunta = [grupo,respuestas[i].descripcion,respuestas[i].categoria,respuestas[i].opcionA,
            respuestas[i].opcionB, respuestas[i].opcionC, respuestas[i].opcionD, respuestas[i].respuesta];
        values[i] = pregunta;
    }
    
    async.waterfall([
        function(callback) {
            pool.getConnection(function(err,connection){
                if (err) {
                  connection.release();
                  res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                  return;
                }   

                var query = connection.query(insertQuery, [values], function(err,rows){
                    connection.release();
                    if(!err){
                        console.log('Se guardaron las preguntas.');
                        callback(null, 'success');
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
        }, function(arg1, callback){
            pool.getConnection(function(err,connection){
                if (err) {
                  connection.release();
                  res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                  return;
                }   

                var query = connection.query("SELECT * FROM Pregunta WHERE id_grupo = ?;", grupo, function(err,rows){
                    connection.release();
                    if(!err){
                        _.each(rows, function(row){
                            var conteos = [];
                            for(var j = 1; j <= 4; j++){
                                var c = [row.id_pregunta, j, grupo, 0];
                                conteos[j - 1] = c;
                            }
                            pool.getConnection(function(err,connection){
                                if (err) {
                                  connection.release();
                                  res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                                  return;
                                }   

                                var query = connection.query(insertEstad, [conteos], function(err,rows){
                                    connection.release();
                                    if(!err){
                                        console.log('Conteo inicializado.');
                                    }else{
                                        console.log('Hubo error en el insertado del conteo.');
                                        console.log(err);
                                    }
                                });

                                connection.on('error', function(err) {      
                                      res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                                      return;     
                                });
                            });
                        });
                        callback(null, 'done');
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
        }
    ], function(err, result){
        if(!err){
            res.send('success');
        }
    });
    
});

app.post('/guardarRespuestas', function(req, res){
    var idAlum = req.session.idAlumno;
    var idGpo = req.session.grupoAct;
    var noPreg = parseInt(req.body.noPreguntas) - 1;
    var respuestas = JSON.parse(req.body.resps);
    var preguntas = JSON.parse(req.body.pregs);
    
    var values = [];
    var insertQuery  = 'insert into Alumno_pregunta(id_alumno, id_pregunta, respuesta, id_grupo) values ?;';
    var updateQuery  = 'UPDATE Estadisticas_grupo SET conteo = (conteo + 1) WHERE respuesta = ? AND id_pregunta = ?;';
    var queries = '';
    
    for(var i = 0; i < noPreg; i++){
        var pregunta = [idAlum,preguntas[i],respuestas[i], idGpo];
        values[i] = pregunta;
        queries += 'UPDATE Estadisticas_grupo SET conteo = (conteo + 1) WHERE respuesta = '
                +  respuestas[i] + ' AND id_pregunta = ' + preguntas[i] + ';';
    }
    
    async.waterfall([
        function(callback) {
            pool.getConnection(function(err,connection){
                if (err) {
                  connection.release();
                  res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                  return;
                }   

                var query = connection.query(queries, function(err,rows){
                    connection.release();
                    if(!err){
                        console.log('Se actualizaron las estadisticas.');
                        callback(null, 'done');
                    }else{
                        console.log('Hubo error en la actualización de resultados.');
                        console.log(err);
                    }
                });

                connection.on('error', function(err) {      
                      res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                      return;     
                });
            });
        }, function(arg1, callback){
            pool.getConnection(function(err,connection){
                if (err) {
                  connection.release();
                  res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                  return;
                }   

                var query = connection.query(insertQuery, [values], function(err,rows){
                    connection.release();
                    if(!err){
                        console.log('Se guardaron las respuestas.');
                        req.session.grupoAct = 0;
                        callback(null, 'done');
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
        }
    ], function(err, result){
        if(!err){
            res.send('success');
        }
    });
});

app.post('/estadisticas', function(req, res){
    var grupo = req.body.grupo;
    
    async.waterfall([
        function(callback) {
            pool.getConnection(function(err,connection){
                if (err) {
                  connection.release();
                  res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                  return;
                }   

                connection.query('SELECT * FROM estadisticas_grupo WHERE id_grupo = ? ORDER BY respuesta, id_pregunta ASC;', grupo, function(err, rows){
                    connection.release();
                    if(!err){
                        if(typeof rows[0] !== 'undefined'){
                            callback(null, rows);
                        }else{
                            callback(null, "No hay informacion.");
                        }
                    }else{
                        console.log('Error al recopilar grupos respondidos.');
                    }
                });

                connection.on('error', function(err) {      
                      res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                      return;     
                });
            });
        }, function(arg1, callback){
            pool.getConnection(function(err,connection){
                if (err) {
                  connection.release();
                  res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                  return;
                }   

                connection.query('SELECT DISTINCT id_pregunta FROM estadisticas_grupo WHERE id_grupo = ?;', grupo, function(err, rows){
                    connection.release();
                    if(!err){
                        if(typeof rows[0] !== 'undefined'){
                            callback(null, arg1, rows);
                        }else{
                            var empty = [];
                            callback(null, arg1, empty);
                        }
                    }else{
                        console.log('Error al recopilar grupos respondidos.');
                    }
                });

                connection.on('error', function(err) {      
                      res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
                      return;     
                });
            });
        }
    ], function(err, res1, res2){
        if(!err){
            res.send({datos:res1, titulos:res2});
        }
    });
});

app.post('/cambiosPregunta', function(req, res){
  pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        } 
        connection.query('SELECT * FROM Pregunta WHERE id_pregunta = ?', req.body.idPregunta, function(err, rows){
            connection.release();
            if(!err){
                res.render('Cambiospreguntas.ejs', {pregunta: rows, usuario:req.session.usuario});
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

app.post('/actualizarPregunta', function(req, res){
    var pregunta = req.body.idPregunta;
    var categoria = req.body.categoria;
    var descripcion = req.body.descripcion;
    var o1 = req.body.opcionA;
    var o2 = req.body.opcionB;
    var o3 = req.body.opcionC;
    var o4 = req.body.opcionD;
    var respuesta = req.body.respuesta;
    console.log(pregunta);
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        }   

        var query = connection.query('Update Pregunta SET ? where id_pregunta = ?',[{descripcion:descripcion,categoria:categoria,respuesta:respuesta, A:o1, B:o2, C:o3, D:o4},pregunta],function(err,rows){
            connection.release();
            if(!err) {
                console.log('Se guardo la pregunta.');
                //console.log(query);
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
    res.send('grupos');
});

app.post('/preguntasGrupo', function(req, res){
   var id_grupo = req.body.idGrupo;
  pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({codigo : 100, estatus: "Error en la conexion con la base de datos"});
          return;
        } 
        connection.query('SELECT * FROM Pregunta WHERE id_grupo = ?', id_grupo, function(err, rows){
            connection.release();
            if(!err){
                res.render('preguntasGrupo.ejs',{rows:rows, usuario:req.session.usuario});
            }else{
                console.log('Hubo error.' + id_grupo);
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
