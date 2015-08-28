var answers = ["Ignacio Lopez Rayon",
        "Carlos Maria de Bustamante",
        "Francisco Xavier Mina",
        "Francisco Primo de Verdad y Ramos",
        "Mariano Matamoros",
        "Miguel Ramos Arizpe",
        "Hermenegildo Galeana",
        "Alvaro Obregon",
        "Jose Vasconcelos",
        "Francisco Villa",
        "Francisco Mugica",
        "Ricardo Flores Magon",
        "Heriberto Jara",
        "Pedro Moreno",
        "Nicolas Bravo",
        "Servando Teresa de Mier",
        "Agustin de Iturbide",
        "Leona Vicario",
        "Jose Maria Cos",
        "Filomeno Mata",
        "Carmen Sedan",
        "Andres Molina Enriquez",
        "Luis Cabrera",
        "Eulalio Gutierrez",
        "Belisario Dominguez",
        "Otilio Montano",
        "Miguel Hidalgo y Costilla",
        "Jose Maria Morelos y Pavon",
        "Vicente Guerrero",
        "Ignacio Allende",
        "Guadalupe Victoria",
        "Josefa Ortiz de Dominguez",
        "Francisco I. Madero",
        "Emiliano Zapata",
        "Venustiano Carranza",
        "Adelita",
        "Jose Maria Pino Suarez"];
var correctas = 0;

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

var username;
var password;

function loadJSON() {
    var response = "";
    var form_data = {
        username: username,
        password: password
    };
    $.ajax({
        type: "POST", 
        url: "http://paginas.ccm.itesm.mx/~A01215142/Flashcards/bonus-2.json", 
        data: form_data,
        success: function(response)
        {
            /*response = '[{"Language":"jQuery","ID":"1"},{"Language":"C#","ID":"2"},
                           {"Language":"PHP","ID":"3"},{"Language":"Java","ID":"4"},
                           {"Language":"Python","ID":"5"},{"Language":"Perl","ID":"6"},
                           {"Language":"C++","ID":"7"},{"Language":"ASP","ID":"8"},
                           {"Language":"Ruby","ID":"9"}]'*/
            console.log(response);
            
	    var json_obj = $.parseJSON(response);//parse JSON
            
            answers = json_obj.Respuestas;
        },
        dataType: "json"//set to JSON    
    })
}/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


