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

function checkAnswer(){
    var answ = $('#answer').val();
    if(answers.indexOf(answ) > -1){
        var ind = answers.indexOf(answ)+ 1;
        document.getElementById('answer').value = '';
        $("#" + ind).html("<b>" + answ + "</b>");
    }
}

function loadJSON() {
    $.getJSON( "http://paginas.ccm.itesm.mx/~A01215142/Flashcards/bonus-1.json", function( data ) {
        var items = [];
        $.each( data, function( key, val ) {
            items.push( "<li id='" + key + "'>" + val + "</li>" );
        });

        $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
        }).appendTo( "body" );
    });
}