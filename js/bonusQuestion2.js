var answers;
var correctas = 0;

$(document).ready(function () {                   
    $.getJSON('json/bonus-2.json', function (contenidoArchivo) {
        document.getElementById("pregunta").innerHTML = contenidoArchivo.Pregunta;
        answers = contenidoArchivo.Respuestas;
    });
});

function checkAnswer(){
    var answ = $('#answer').val();
    if(answers.indexOf(answ) > -1){
        correctas++;
        var ind = answers.indexOf(answ)+ 1;
        document.getElementById('answer').value = '';
        $("#" + ind).html("<b>" + answ + "</b>");
        $("#correctas").html(correctas + "/37");
    }
}


