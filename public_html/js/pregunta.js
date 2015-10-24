var preguntas = 0;
var actual = 1;
var respuestas = [];
var miGrupo = "";

$(document).ready(function(){
        var miDescripcion,miOpA,miOpB,miOpC,miOpD,miRespuesta,miCategoria;
        $("#alta").click(function(){
            miDescripcion=$("#descrip").val();
            miOpA=$("#op1").val();
            miOpB=$("#op2").val();
            miOpC=$("#op3").val();
            miOpD=$("#op4").val();
            miRespuesta=$("#respuesta").val();
            miCategoria=$("#categoria").val();

            if(miDescripcion != "" && miOpA != "" && miOpB != "" && miOpC != "" && miOpD != "" && miCategoria != ""){
                respuestas[actual - 1] = {descripcion: miDescripcion,
                            opcionA: miOpA,
                            opcionB: miOpB,
                            opcionC: miOpC,
                            opcionD: miOpD,
                            respuesta: miRespuesta,
                            categoria: miCategoria};

            var elJSON = JSON.stringify(respuestas);
            alert(elJSON);
            
                $.ajax({
                    type: 'POST',
                    url: '/nuevaPregunta',
                    data: {grupo: miGrupo,
                        resps: elJSON},
                    success: function(data){
                        if(data === "success"){
                            alert("Preguntas guardada.");
                            window.location = "agregarPregunta";
                        }else{
                            window.location = "entrada";
                        }
                    }
                });
            }else{
                alert("Todos los campos son necesarios.");
            }
        });
    });

$(document).ready(function(){
        $("#acepta").click(function(){
            miGrupo=$("#grupo").val();
            preguntas = parseInt($("#noPreguntas").val());
            if(preguntas > 0){
                $("#inicial").css('display','none');
                var htmls = "Pregunta : "+ actual + " / " + preguntas + "<br />" + "<div class='descripcionPregunta'> "+
                        "<div class='descripcionPregunta' id='categoriaPregunta'>Categor&iacute;a:</div><input type=\"text\" id=\"categoria\" maxlenght=\"50\" /><br />"+
                        "Descripci&oacute;n:"+"</div>"+"<textarea id=\"descrip\" rows=\"5\"></textarea><br />" +
                        "<div class='descripcionPregunta' id='opcion1Text'>Opci&oacute;n 1:</div>"+"<br /><textarea id=\"op1\" rows=\"5\"></textarea><br />" +
                        "<div class='descripcionPregunta' id='opcion2Text'>Opci&oacute;n 2:</div><br /><textarea id=\"op2\" rows=\"5\"></textarea><br />" + 
                        "<div class='descripcionPregunta' id='opcion3Text'>Opci&oacute;n 3:</div><br /><textarea id=\"op3\" rows=\"5\"></textarea><br />" +
                        "<div class='descripcionPregunta' id='opcion4Text'>Opci&oacute;n 4:</div><br /><textarea id=\"op4\" rows=\"5\"></textarea><br />" +
                        "<div class='descripcionPregunta' id='res'>Respuesta:</div> <select id=\"respuesta\"><option value=\"1\">Opción 1</option>" +
                        "<option value=\"2\">Opción 2</option><option value=\"3\">Opción 3</option>" +
                        "<option value=\"4\">Opción 4</option></select><br />";
                if(preguntas > 1){
                    htmls = htmls + "<input type=\"submit\" value=\"Siguiente\" id=\"siguiente\" onClick=\"next();\"/>";
                }else{
                    htmls = htmls + "<input type=\"submit\" value=\"Registrar\" id=\"alta\" onClick=\"alta();\"/>";
                }
                
                $("#preguntas").css('opacity','1').html(htmls);
            }else{
                alert("Error: Numero no valido.");
            }
        });
    });

function next(){
    var miDescripcion,miOpA,miOpB,miOpC,miOpD,miRespuesta,miCategoria;

    miDescripcion=$("#descrip").val();
    miOpA=$("#op1").val();
    miOpB=$("#op2").val();
    miOpC=$("#op3").val();
    miOpD=$("#op4").val();
    miRespuesta=$("#respuesta").val();
    miCategoria=$("#categoria").val();

    if(miDescripcion != "" && miOpA != "" && miOpB != "" && miOpC != "" && miOpD != "" && miCategoria != ""){
        respuestas[actual - 1] = {descripcion: miDescripcion,
                    opcionA: miOpA,
                    opcionB: miOpB,
                    opcionC: miOpC,
                    opcionD: miOpD,
                    respuesta: miRespuesta,
                    categoria: miCategoria};

        actual++;
        
        var htmls = actual + " / " + preguntas + "<br />";
        
        if(typeof respuestas[actual - 1] !== 'undefined'){
            htmls = htmls + 
            "<div class='descripcionPregunta'><div class='descripcionPregunta' id='categoriaPregunta'>Categor&iacute;a:</div><input type=\"text\" value=\"" + respuestas[actual - 1].categoria + "\" id=\"categoria\" maxlenght=\"50\" /><br />" +
            "Descripci&oacute;n:</div><br /><textarea id=\"descrip\" rows=\"5\">" + respuestas[actual - 1].descripcion + "</textarea><br />" +
            "<div class='descripcionPregunta' id='opcion1Text' > Opci&oacute;n 1:</div><br /><textarea id=\"op1\" rows=\"5\">" + respuestas[actual - 1].opcionA + "</textarea><br />" +
            "<div class='descripcionPregunta' id='opcion2Text' >Opci&oacute;n 2:</div><br /><textarea id=\"op2\" rows=\"5\">" + respuestas[actual - 1].opcionB + "</textarea><br />" + 
            "<div class='descripcionPregunta' id='opcion3Text' >Opci&oacute;n 3:</div><br /><textarea id=\"op3\" rows=\"5\">" + respuestas[actual - 1].opcionC + "</textarea><br />" +
            "<div class='descripcionPregunta' id='opcion4Text' >Opci&oacute;n 4:</div><br /><textarea id=\"op4\" rows=\"5\">" + respuestas[actual - 1].opcionD + "</textarea><br />" +
            "<div class='descripcionPregunta' id='res'> Respuesta:</div><select id=\"respuesta\"><option value=\"1\">1</option>" +
            "<option value=\"2\">2</option><option value=\"3\">3</option>" +
            "<option value=\"4\">4</option></select><br />";
        }else{
            htmls = htmls + 
                    "<div class='descripcionPregunta'><div class='descripcionPregunta' id='categoriaPregunta'>Categor&iacute;a:</div><input type=\"text\" id=\"categoria\" maxlenght=\"50\" /><br />"+
                    "Descripci&oacute;n:</div><br /><textarea id=\"descrip\" rows=\"5\"></textarea><br />" +
                    "<div class='descripcionPregunta' id='opcion1Text'> Opci&oacute;n 1:</div><br /><textarea id=\"op1\" rows=\"5\"></textarea><br />" +
                    "<div class='descripcionPregunta' id='opcion2Text'>Opci&oacute;n 2:</div></div><br /><textarea id=\"op2\" rows=\"5\"></textarea><br />" + 
                    "<div class='descripcionPregunta' id='opcion3Text'>Opci&oacute;n 3:</div><br /><textarea id=\"op3\" rows=\"5\"></textarea><br />" +
                    "<div class='descripcionPregunta' id='opcion4Text'>Opci&oacute;n 4:</div><br /><textarea id=\"op4\" rows=\"5\"></textarea><br />" +
                    "<div class='descripcionPregunta' id='res'>Respuesta:</div><select id=\"respuesta\"><option value=\"1\">1</option>" +
                    "<option value=\"2\">2</option><option value=\"3\">3</option>" +
                    "<option value=\"4\">4</option></select><br />";
        }

        if(actual < preguntas){
            htmls = htmls + "<input type=\"submit\" value=\"Regresar\" id=\"regresar\" onClick=\"prev();\"/>" +
                    "<input type=\"submit\" value=\"Siguiente\" id=\"siguiente\" onClick=\"next();\"/>";
        }else{
            htmls = htmls + "<input type=\"submit\" value=\"Regresar\" id=\"regresar\" onClick=\"prev();\"/>" +
                                "<input type=\"submit\" value=\"Registrar\" id=\"alta\" onClick=\"alta();\"/>";
        }

        $("#preguntas").css('opacity','1').html(htmls);
    }else{
        alert("Todos los campos son necesarios.");
    }
}
    
function prev(){

    actual--;
    
    var htmls = actual + " / " + preguntas + "<br />" +
            "<div class='descripcionPregunta'><div class='descripcionPregunta' id='categoriaPregunta'>Categor&iacute;a:</div><input type=\"text\" value=\"" + respuestas[actual - 1].categoria + "\" id=\"categoria\" maxlenght=\"50\" /><br />" +
            "Descripci&oacute;n:</div><br /><textarea id=\"descrip\" rows=\"5\">" + respuestas[actual - 1].descripcion + "</textarea><br />" +
            "<div class='descripcionPregunta' id='opcion1Text'>Opci&oacute;n 1:</div><br /><textarea id=\"op1\" rows=\"5\">" + respuestas[actual - 1].opcionA + "</textarea><br />" +
            "<div class='descripcionPregunta' id='opcion2Text'>Opci&oacute;n 2:</div><br /><textarea id=\"op2\" rows=\"5\">" + respuestas[actual - 1].opcionB + "</textarea><br />" + 
            "<div class='descripcionPregunta' id='opcion3Text'>Opci&oacute;n 3:</div><br /><textarea id=\"op3\" rows=\"5\">" + respuestas[actual - 1].opcionC + "</textarea><br />" +
            "<div class='descripcionPregunta' id='opcion4Text'>Opci&oacute;n 4:</div><br /><textarea id=\"op4\" rows=\"5\">" + respuestas[actual - 1].opcionD + "</textarea><br />" +
            "<div class='descripcionPregunta' id='res'>Respuesta:</div><select id=\"respuesta\"><option value=\"1\">1</option>" +
            "<option value=\"2\">2</option><option value=\"3\">3</option>" +
            "<option value=\"4\">4</option></select><br />";
                
    if(1 < actual){
        htmls = htmls + "<input type=\"submit\" value=\"Regresar\" id=\"regresar\" onClick=\"prev();\"/>" +
                "<input type=\"submit\" value=\"Siguiente\" id=\"siguiente\" onClick=\"next();\"/>";
    }else{
        htmls = htmls + "<input type=\"submit\" value=\"Siguiente\" id=\"siguiente\" onClick=\"next();\"/>";
    }
    
    $("#preguntas").css('opacity','1').html(htmls);
}

function alta(){
    var miDescripcion,miOpA,miOpB,miOpC,miOpD,miRespuesta,miCategoria,miGrupo,preguntas;
    
    miGrupo=$("#grupo").val();
    miDescripcion=$("#descrip").val();
    miOpA=$("#op1").val();
    miOpB=$("#op2").val();
    miOpC=$("#op3").val();
    miOpD=$("#op4").val();
    miRespuesta=$("#respuesta")[0].selectedIndex + 1;
    miCategoria=$("#categoria").val();
    preguntas = parseInt($("#noPreguntas").val());
    alert(miRespuesta);

    if(miDescripcion != "" && miOpA != "" && miOpB != "" && miOpC != "" && miOpD != "" && miCategoria != ""){
        respuestas[actual - 1] = {descripcion: miDescripcion,
                    opcionA: miOpA,
                    opcionB: miOpB,
                    opcionC: miOpC,
                    opcionD: miOpD,
                    respuesta: miRespuesta,
                    categoria: miCategoria};

        var elJSON = JSON.stringify(respuestas);
        
        $.ajax({
            type: 'POST',
            url: '/nuevaPregunta',
            data: {grupo: miGrupo,noPreguntas:preguntas,
                resps: elJSON},
            success: function(data){
                if(data === "success"){
                    alert("Preguntas guardada.");
                    window.location = "agregarPregunta";
                }else{
                    window.location = "entrada";
                }
            }
        });
    }else{
        alert("Todos los campos son necesarios.");
    }
}