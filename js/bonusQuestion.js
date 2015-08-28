var answers = [ "aguascalientes",
        "mexicali",
        "la paz",
        "campeche",
        "saltillo",
        "colima",
        "tuxtla gutierrez",
        "chihuahua",
        "durango",
        "guanajuato",
        "chilpancingo",
        "pachuca",
        "guadalajara",
        "toluca",
        "morelia",
        "cuernavaca",
        "tepic",
        "monterrey",
        "oaxaca",
        "puebla",
        "queretaro",
        "chetumal",
        "san luis potosi",
        "culiacan",
        "hermosillo",
        "villahermosa",
        "ciudad victoria",
        "tlaxcala",
        "xalapa",
        "merida",
        "zacatecas"];
var correctas = 0;

function checkAnswer(){
    var answ = $('#answer').val();
    if(answers.indexOf(answ) > -1){
        correctas++;
        var ind = answers.indexOf(answ)+ 1;
        document.getElementById('answer').value = '';
        $("#" + ind).html("<b>" + answ + "</b>");
        $("#correctas").html(correctas + "/31");
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
        url: "http://paginas.ccm.itesm.mx/~A01215142/Flashcards/bonus-1.json", 
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
}