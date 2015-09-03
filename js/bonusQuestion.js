var correctas = 0;
var answers;
var timeLeft, puntaje;

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

        var deadline = Date.now() + 1000 * 90; //90 segundos
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
                location.replace("index.html");
            }
        }

        timer();
        
        puntaje = parseInt(localStorage["puntaje"]);
        document.getElementById("puntos").innerHTML = puntaje;
    });
});

function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] === variable){return pair[1];}
       }
       return(false);
}
            
function checkAnswer(){
    var answ = $('#answer').val().toString();
    answ = answ.toLowerCase();
    if(answers.indexOf(answ) > -1){
        correctas++;
        puntaje += 150;
        var ind = answers.indexOf(answ)+ 1;
        document.getElementById('answer').value = '';
        $("#" + ind).html("<b>" + answ + "</b>");
        $("#correctas").html(correctas + "/31");
        document.getElementById("puntos").innerHTML = puntaje;
    }
}