var correctas = 0;
var answers;

$(document).ready(function () {                   
    $.getJSON('json/bonus-1.json', function (contenidoArchivo) {
        document.getElementById("pregunta").innerHTML = contenidoArchivo.Pregunta;
        answers = contenidoArchivo.Respuestas;
    });
});
            
function checkAnswer(){
    var answ = $('#answer').val().toString();
    answ = answ.toLowerCase();
    if(answers.indexOf(answ) > -1){
        correctas++;
        var ind = answers.indexOf(answ)+ 1;
        document.getElementById('answer').value = '';
        $("#" + ind).html("<b>" + answ + "</b>");
        $("#correctas").html(correctas + "/31");
    }
}