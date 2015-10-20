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
            
                $.ajax({
                    type: 'POST',
                    url: '/nuevaPregunta',
                    data: {grupo: miGrupo,
                        resps: respuestas},
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
                var htmls = actual + " / " + preguntas + "<br />" +
                        "Descripci&oacute;n:<br /><textarea id=\"descrip\" rows=\"5\"></textarea><br />" +
                        "Opci&oacute;n 1:<br /><textarea id=\"op1\" rows=\"5\"></textarea><br />" +
                        "Opci&oacute;n 2:<br /><textarea id=\"op2\" rows=\"5\"></textarea><br />" + 
                        "Opci&oacute;n 3:<br /><textarea id=\"op3\" rows=\"5\"></textarea><br />" +
                        "Opci&oacute;n 4:<br /><textarea id=\"op4\" rows=\"5\"></textarea><br />" +
                        "Respuesta: <select id=\"respuesta\"><option value=\"1\">1</option>" +
                        "<option value=\"2\">2</option><option value=\"3\">3</option>" +
                        "<option value=\"4\">4</option></select><br />" +
                        "Categor&iacute;a: <input type=\"text\" id=\"categoria\" maxlenght=\"50\" /><br />";
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
            htmls = htmls + "Descripci&oacute;n:<br /><textarea id=\"descrip\" rows=\"5\">" + respuestas[actual - 1].descripcion + "</textarea><br />" +
            "Opci&oacute;n 1:<br /><textarea id=\"op1\" rows=\"5\">" + respuestas[actual - 1].opcionA + "</textarea><br />" +
            "Opci&oacute;n 2:<br /><textarea id=\"op2\" rows=\"5\">" + respuestas[actual - 1].opcionB + "</textarea><br />" + 
            "Opci&oacute;n 3:<br /><textarea id=\"op3\" rows=\"5\">" + respuestas[actual - 1].opcionC + "</textarea><br />" +
            "Opci&oacute;n 4:<br /><textarea id=\"op4\" rows=\"5\">" + respuestas[actual - 1].opcionD + "</textarea><br />" +
            "Respuesta: <select id=\"respuesta\"><option value=\"1\">1</option>" +
            "<option value=\"2\">2</option><option value=\"3\">3</option>" +
            "<option value=\"4\">4</option></select><br />" +
            "Categor&iacute;a: <input type=\"text\" value=\"" + respuestas[actual - 1].categoria + "\" id=\"categoria\" maxlenght=\"50\" /><br />";
        }else{
            htmls = htmls + "Descripci&oacute;n:<br /><textarea id=\"descrip\" rows=\"5\"></textarea><br />" +
                    "Opci&oacute;n 1:<br /><textarea id=\"op1\" rows=\"5\"></textarea><br />" +
                    "Opci&oacute;n 2:<br /><textarea id=\"op2\" rows=\"5\"></textarea><br />" + 
                    "Opci&oacute;n 3:<br /><textarea id=\"op3\" rows=\"5\"></textarea><br />" +
                    "Opci&oacute;n 4:<br /><textarea id=\"op4\" rows=\"5\"></textarea><br />" +
                    "Respuesta: <select id=\"respuesta\"><option value=\"1\">1</option>" +
                    "<option value=\"2\">2</option><option value=\"3\">3</option>" +
                    "<option value=\"4\">4</option></select><br />" +
                    "Categor&iacute;a: <input type=\"text\" id=\"categoria\" maxlenght=\"50\" /><br />";
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
            "Descripci&oacute;n:<br /><textarea id=\"descrip\" rows=\"5\">" + respuestas[actual - 1].descripcion + "</textarea><br />" +
            "Opci&oacute;n 1:<br /><textarea id=\"op1\" rows=\"5\">" + respuestas[actual - 1].opcionA + "</textarea><br />" +
            "Opci&oacute;n 2:<br /><textarea id=\"op2\" rows=\"5\">" + respuestas[actual - 1].opcionB + "</textarea><br />" + 
            "Opci&oacute;n 3:<br /><textarea id=\"op3\" rows=\"5\">" + respuestas[actual - 1].opcionC + "</textarea><br />" +
            "Opci&oacute;n 4:<br /><textarea id=\"op4\" rows=\"5\">" + respuestas[actual - 1].opcionD + "</textarea><br />" +
            "Respuesta: <select id=\"respuesta\"><option value=\"1\">1</option>" +
            "<option value=\"2\">2</option><option value=\"3\">3</option>" +
            "<option value=\"4\">4</option></select><br />" +
            "Categor&iacute;a: <input type=\"text\" value=\"" + respuestas[actual - 1].categoria + "\" id=\"categoria\" maxlenght=\"50\" /><br />";
                
    if(1 < actual){
        htmls = htmls + "<input type=\"submit\" value=\"Regresar\" id=\"regresar\" onClick=\"prev();\"/>" +
                "<input type=\"submit\" value=\"Siguiente\" id=\"siguiente\" onClick=\"next();\"/>";
    }else{
        htmls = htmls + "<input type=\"submit\" value=\"Siguiente\" id=\"siguiente\" onClick=\"next();\"/>";
    }
    
    $("#preguntas").css('opacity','1').html(htmls);
}

function alta(){
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

        $.ajax({
            type: 'POST',
            url: '/nuevaPregunta',
            data: {grupo: miGrupo,
                resps: respuestas[0]},
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