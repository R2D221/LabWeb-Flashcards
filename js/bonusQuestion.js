if (window.name != "juego") {
	location.replace("Home.html");
}

var safeToLeave = false;
window.onbeforeunload = function () {
	if (!safeToLeave) return "Si sales de esta página, perderás tu progreso.";
};

var correctas = 0;
var answers;
var timeLeft, puntaje;
var nivel = parseInt(localStorage["nivel"]);
var usuario = localStorage["usuario_actual"];
var answered = [];

function formatTime(sec_num) {
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));

    var hourSeparator = ':';
    var minuteSeparator = ':';

    if (hours == 0) { hours = ''; hourSeparator = ''; }
    if (minutes < 10 && hours != 0) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    var time = hours + hourSeparator + minutes + minuteSeparator + seconds;
    return time;
}

$(document).ready(function () {
    var jName = "json/bonus-" + nivel + ".json";
    $.getJSON(jName, function (contenidoArchivo) {
        document.getElementById("pregunta").innerHTML = contenidoArchivo.Pregunta;
        answers = contenidoArchivo.Respuestas;

        var deadline = Date.now() + 1000 * parseInt(contenidoArchivo.Tiempo);
        function timer()
        {
            timeLeft = deadline - Date.now();
            var $timerElement = $("#timer");
            $timerElement.text(formatTime(timeLeft / 1000));

            if (timeLeft > 0) {
                setTimeout(timer, 50);
            }
            else
            {
                if(correctas === 0){
                    if(localStorage.getItem("logros_" + usuario) === null){
                        var logros = {
                            logros:[{
                                    nombre: "Uy, estaba muy difícil.",
                                    descripcion: "Fallaste épicamente el bonus.",
                                    imagen: "img/fallaEpica.png"
                            }]
                        };
                        alert("¡Desbloqueaste un logro!");

                        localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                    }else{
                        var logros = {};
                        var obtenido = 0;
                        logros = JSON.parse(localStorage.getItem("logros_" + usuario));
                        for(var k = 0; k < logros.logros.length; k++){
                            if(logros.logros[k].nombre.indexOf("Uy, estaba muy difícil.") > -1){
                                obtenido = 1;
                            }
                        }
                        if(obtenido === 0){
                            logros.logros.push({
                                        nombre: "Uy, estaba muy difícil.",
                                        descripcion: "Fallaste épicamente el bonus.",
                                        imagen: "img/fallaEpica.png"
                                });

                            localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                            alert("¡Desbloqueaste un logro!");
                        }
                    }
                }

                nivel++;

                if(nivel === 4){
                    if(localStorage.getItem("logros_" + usuario) === null){
                        var logros = {
                            logros:[{
                                    nombre: "Ahí vamos.",
                                    descripcion: "Pasaste el nivel 3.",
                                    imagen: "img/enCamino.png"
                            }]
                        };
                        alert("¡Desbloqueaste un logro!");

                        localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                    }else{
                        var logros = {};
                        var obtenido = 0;
                        logros = JSON.parse(localStorage.getItem("logros_" + usuario));
                        for(var k = 0; k < logros.logros.length; k++){
                            if(logros.logros[k].nombre.indexOf("Ahí vamos.") > -1){
                                obtenido = 1;
                            }
                        }
                        if(obtenido === 0){
                            logros.logros.push({
                                    nombre: "Ahí vamos.",
                                    descripcion: "Pasaste el nivel 3.",
                                    imagen: "img/enCamino.png"
                                });

                            localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                            alert("¡Desbloqueaste un logro!");
                        }
                    }
                }

                localStorage["nivel"] = nivel;
                localStorage["puntaje"] = puntaje;
                safeToLeave = true;
                if(nivel === 6){
                    location.replace("Home.html")
                }else{
                    location.replace("Nivel1.html");
                }
            }
        }

        timer();

        var rows = answers.length / 4;
        rows = Math.floor(rows) +  1;
        var tablaHTML = "";

        for(i = 0; i < 4; i++){
            tablaHTML += "<td><table>";
            for(j = 0; j < rows && (rows * i + j) < answers.length; j++){
                tablaHTML += "<tr>" + "<td class=\"number\" >" + ((j + 1) + (rows * i))
                    + "</td> <td class=\"disp-answer\" id=\"" + ((j + 1) + (rows * i)) + "\" ></td></tr>";
            }
            tablaHTML += "</table></td>";
        }

        $('#answTable').html(tablaHTML);

        puntaje = parseInt(localStorage["puntaje"]);
        document.getElementById("puntos").innerHTML = puntaje;
        var disp = correctas + "/" + answers.length;
        $("#correctas").html(disp);
    });
});

function checkAnswer(){
    var answ = $('#answer').val().toString();
    answ = answ.toLowerCase();
    if(answers.indexOf(answ) > -1){
        var indAnsw = answers.indexOf(answ);
        if(answered.indexOf(indAnsw) > -1){

        }else{
            answered.push(indAnsw);
            correctas++;
            puntaje += 150;
            var ind = answers.indexOf(answ)+ 1;
            document.getElementById('answer').value = '';
            $("#" + ind).html("<b>" + answ + "</b>");
            var disp = correctas + "/" + answers.length;
            $("#correctas").html(disp);
            document.getElementById("puntos").innerHTML = puntaje;

            if(correctas === answers.length){
                if(timeLeft / 1000 > 20){
                    if(localStorage.getItem("logros_" + usuario) === null){
                        var logros = {
                            logros:[{
                                    nombre: "Todo un Pro.",
                                    descripcion: "Respondiste todas las preguntas del bonus y te sobraron 20 segundos.",
                                    imagen: "img/enPerra.png"
                            }]
                        };
                        alert("¡Desbloqueaste un logro!");

                        localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                    }else{
                        var logros = {};
                        var obtenido = 0;
                        logros = JSON.parse(localStorage.getItem("logros_" + usuario));
                        for(var k = 0; k < logros.logros.length; k++){
                            if(logros.logros[k].nombre.indexOf("Ahí vamos.") > -1){
                                obtenido = 1;
                            }
                        }
                        if(obtenido === 0){
                            logros.logros.push({
                                    nombre: "Todo un Pro.",
                                    descripcion: "Respondiste todas las preguntas del bonus.",
                                    imagen: "img/elGuapo.png"
                                });

                            localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                            alert("¡Desbloqueaste un logro!");
                        }
                    }
                }
                if(localStorage.getItem("logros_" + usuario) === null){
                    var logros = {
                        logros:[{
                            nombre: "Todo un Pro.",
                            descripcion: "Respondiste todas las preguntas del bonus y te sobraron 20 segundos.",
                            imagen: "img/enPerra.png"
                        }]
                    };
                    alert("¡Desbloqueaste un logro!");

                    localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                }else{
                    var logros = {};
                    var obtenido = 0;
                    logros = JSON.parse(localStorage.getItem("logros_" + usuario));
                    for(var k = 0; k < logros.logros.length; k++){
                        if(logros.logros[k].nombre.indexOf("Super Bonus.") > -1){
                            obtenido = 1;
                        }
                    }
                    if(obtenido === 0){
                        logros.logros.push({
                                nombre: "Super Bonus.",
                                descripcion: "Respondiste todas las preguntas del bonus.",
                                imagen: "img/elGuapo.png"
                            });

                        localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                        alert("¡Desbloqueaste un logro!");
                    }
                }
            }
        }
    }
}