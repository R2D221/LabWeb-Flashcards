var correctas = 0;
var answers;
var timeLeft, puntaje;
var nivel = parseInt(localStorage["nivel"]);
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
    $.getJSON('json/bonus-1.json', function (contenidoArchivo) {
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
                localStorage["puntaje"] = puntaje;
                location.replace("Nivel1.html");
            }
        }

        timer();
        
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
        }
    }
}