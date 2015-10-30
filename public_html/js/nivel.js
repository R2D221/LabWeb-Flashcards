var safeToLeave = false;
var preguntas = {};

window.onbeforeunload = function () {
        if (!safeToLeave) return "Si sales de esta página, perderás tu progreso.";
};

var puntaje = 0;
var nivel = parseInt(localStorage["nivel"]);
var fallos = parseInt(localStorage["fallidos"]);
var correcta;
var contador = 1;
var timeLeft;
var preguntasMostradas;
var aciertos = 0;
var usuario = localStorage["usuario_actual"];


function evaluarOpcion(opcion){
    if(opcion === correcta){
        puntaje += 100;
        aciertos++;
    }else if(puntaje > 0){
        puntaje -= 50;
    }

    document.getElementById("puntos").innerHTML = puntaje;
    contador++;
    if(contador < (preguntas.length + 1)){
        changeQuestion();
    }else{
        checkAchievement2();

        if(aciertos > (preguntas.length * 0.9)){
            puntaje += (timeLeft / 10);
            localStorage["fallidos"] = 0;
            localStorage["puntaje"] = puntaje;
            safeToLeave = true;
            location.replace("ResultadosNivel1.html");
        }else{
            guardar();
            checkAchievement();
            localStorage["nivel"] = 1;
            localStorage["fallidos"] = 0;
            localStorage["puntaje"] = puntaje;
            safeToLeave = true;
            location.replace("ResultadosNivel1.html");
        }
    }
}

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
    var jName = "json/nivel" + nivel + ".json";
    var contador = 1;

    $('#nivel').html("Nivel " + nivel);
    
    preguntas = JSON.parse(localStorage["preguntas"]);
    preguntasMostradas = new Array(preguntas.length);
    var indice = Math.floor((Math.random()*preguntas.length));
    preguntasMostradas[contador-1] = indice;
    
    document.getElementById("texto").innerHTML = preguntas[indice].descripcion;
    correcta = preguntas[indice].respuesta;
    
     document.getElementById("opcion1").innerHTML = preguntas[indice].A;
     document.getElementById("opcion2").innerHTML = preguntas[indice].B;
     document.getElementById("opcion3").innerHTML = preguntas[indice].C;
     document.getElementById("opcion4").innerHTML = preguntas[indice].D;

    var deadline = Date.now() + 1000 * 60; //60 segundos
    function timer()
    {
        timeLeft = deadline - Date.now();
        var $timerElement = $("#timer");
        $timerElement.text(formatTime(timeLeft / 1000));

        if (timeLeft > 0) {
            setTimeout(timer, 50);
        } else {
            guardar();
            checkAchievement();
            safeToLeave = true;
            location.replace("ResultadosNivel1.html");

        }
    }

    timer();
});

function checkAchievement(){
    if(nivel === 1){
        fallos++;
        if(fallos === 3){
            if(localStorage.getItem("logros_" + usuario) === null){
                var logros = {
                    logros:[{
                            nombre: "Ni con este puedo.",
                            descripcion: "Fallaste el nivel 1 tres veces seguidas.",
                            imagen: "img/esNeta.png"
                    }]
                };

                localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                alert("¡Desbloqueaste un logro!");
            }else{
                var logros = {};
                var obtenido = 0;
                logros = JSON.parse(localStorage.getItem("logros_" + usuario));
                for(var k = 0; k < logros.logros.length; k++){
                    if(logros.logros[k].nombre.indexOf("Ni con este puedo.") > -1){
                        obtenido = 1;
                    }
                }
                if(obtenido === 0){
                    logros.logros.push({
                            nombre: "Ni con este puedo.",
                            descripcion: "Fallaste el nivel 1 tres veces seguidas.",
                            imagen: "img/esNeta.png"
                        });

                    localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                    alert("¡Desbloqueaste un logro!");
                }
            }
        }
    }
}

function checkAchievement2(){
    if(timeLeft / 1000 > 30){
        if(localStorage.getItem("logros_" + usuario) === null){
            var logros = {
                logros:[{
                        nombre: "Estoy en llamas.",
                        descripcion: "Completaste un nivel y te sobraron 30 segundos.",
                        imagen: "img/enLlamas.png"
                }]
            };

            localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
            alert("¡Desbloqueaste un logro!");
        }else{
            var logros = {};
            var obtenido = 0;
            logros = JSON.parse(localStorage.getItem("logros_" + usuario));
            for(var k = 0; k < logros.logros.length; k++){
                if(logros.logros[k].nombre.indexOf("Estoy en llamas.") > -1){
                    obtenido = 1;
                }
            }
            if(obtenido === 0){
                logros.logros.push({
                            nombre: "Estoy en llamas.",
                            descripcion: "Completaste un nivel y te sobraron 30 segundos.",
                            imagen: "img/enLlamas.png"
                    });

                localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                alert("¡Desbloqueaste un logro!");
            }
        }
    }
    
}

function changeQuestion(){
    if(contador <= preguntas.length){
        var indice;
        do{
            indice = Math.floor((Math.random()*preguntas.length));
        }while(verificarPregunta(indice));
        preguntasMostradas[contador-1] = indice;

        document.getElementById("texto").innerHTML = preguntas[indice].descripcion;
        correcta = preguntas[indice].respuesta;

        document.getElementById("opcion1").innerHTML = preguntas[indice].A;
        document.getElementById("opcion2").innerHTML = preguntas[indice].B;
        document.getElementById("opcion3").innerHTML = preguntas[indice].C;
        document.getElementById("opcion4").innerHTML = preguntas[indice].D;
    }else{
        guardar();
        localStorage["nivel"] = 1;
        safeToLeave = true;
        location.replace("ResultadosNivel1.html");
    }
}

function verificarPregunta(numero){
    var resultado = false;

    for(var i =0; i < contador; i++){
        if(preguntasMostradas[i]===numero){
            resultado =  true;
        }
    }

    return resultado;
}

function guardar(){
    var tp = timeLeft/1000;

    var resultados = {
        aciertos: aciertos,
        tiempo: tp,
        bono:0
    };
    localStorage ["resultados"] = JSON.stringify(resultados);

    if(localStorage.getItem("max_puntuaciones") === null){
        var puntuaciones = {
            puntuaciones:[{
                    usuario: localStorage["usuario_actual"],
                    puntuacion: puntaje
            },{
                    usuario: "anonimo",
                    puntuacion: 0
            },{
                    usuario: "anonimo",
                    puntuacion: 0
            },{
                    usuario: "anonimo",
                    puntuacion: 0
            },{
                    usuario: "anonimo",
                    puntuacion: 0
            }]
        };

        localStorage.setItem("max_puntuaciones", JSON.stringify(puntuaciones));
    }else{
        var max = {};
        var temp1, temp2, start;
        max = JSON.parse(localStorage.getItem("max_puntuaciones"));
        for(var i = 0; i < 5; i++){
            if(max.puntuaciones[i].puntuacion < puntaje){
                temp1 = max.puntuaciones[i].puntuacion;
                temp2 = max.puntuaciones[i].usuario;
                start = i;
                max.puntuaciones[i].puntuacion = puntaje;
                max.puntuaciones[i].usuario = localStorage["usuario_actual"];
                break;
            }
        }

        if(start === 0){
            if(localStorage.getItem("logros_" + usuario) === null){
                var logros = {
                    logros:[{
                            nombre: "Bop to the top.",
                            descripcion: "Colocaste tu puntuación como la número 1.",
                            imagen: "img/elEraElNumeroUno.png"
                    }]
                };

                localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                alert("¡Desbloqueaste un logro!");
            }else{
                var logros = {};
                var obtenido = 0;
                logros = JSON.parse(localStorage.getItem("logros_" + usuario));
                for(var k = 0; k < logros.logros.length; k++){
                    if(logros.logros[k].nombre.indexOf("Bop to the top.") > -1){
                        obtenido = 1;
                    }
                }
                if(obtenido === 0){
                    logros.logros.push({
                            nombre: "Bop to the top.",
                            descripcion: "Colocaste tu puntuación como la número 1.",
                            imagen: "img/elEraElNumeroUno.png"
                        });

                    localStorage.setItem("logros_" + usuario, JSON.stringify(logros));
                    alert("¡Desbloqueaste un logro!");
                }
            }
        }

        for(var i = start + 1; i < 5; i++){
            var temp3 = max.puntuaciones[i].puntuacion;
            var temp4 = max.puntuaciones[i].usuario;
            max.puntuaciones[i].puntuacion = temp1;
            max.puntuaciones[i].usuario = temp2;
            temp1 = temp3;
            temp2 = temp4;
        }

        localStorage.setItem("max_puntuaciones", JSON.stringify(max));
    }
}



