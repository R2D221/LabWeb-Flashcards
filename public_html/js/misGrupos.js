function examen(idGpo){
    $.ajax({
        type: 'POST',
        url: '/tomarExamen',
        data: {idGrupo: idGpo},
        success: function(data){
            var resp = JSON.parse(data);
            if(typeof resp[0] === 'undefined'){
                alert('No hay preguntas disponibles para ese grupo, lo sentimos.');
            }else{
                localStorage["preguntas"] = JSON.stringify(resp);
                window.location = 'Nivel1.html';
            }
        }
    });
}