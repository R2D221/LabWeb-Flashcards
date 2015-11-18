var rank = [];

$(document).ready(function(){
    var miGrupo;
    $("#selecciona").click(function(){
        miGrupo=$("#grupo").val();
        
        $.ajax({
            type: 'POST',
            url: '/ranking_grupo',
            data: {idGrupo: miGrupo},
            success: function(data){
                rank = JSON.parse(data);
                actualizarRanking();
            }
        });
    });
});

function actualizarRanking(){
    for(var i =0; i < 5; i++){
       document.getElementById('nick' + (i+1)).innerHTML = rank[i].nombre;
       document.getElementById('puntaje' + (i+1)).innerHTML = rank[i].puntuacion;
    }
}

