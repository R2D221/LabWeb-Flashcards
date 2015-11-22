$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: '/logros',
        data: {},
        success: function(data){
            var resp = JSON.parse(data);
            if(typeof resp[0] === 'undefined'){
                alert('No hay informacion del alumno disponible, lo sentimos.');
            }else{
                var logros = resp[0].logros;
                localStorage["misLogros"] = logros;
            }
        }
    });
});

function lograr(){
    $.ajax({
        type: 'GET',
        url: '/logros',
        data: {},
        success: function(data){
            var resp = JSON.parse(data);
            if(typeof resp[0] === 'undefined'){
                alert('No hay informacion del alumno disponible, lo sentimos.');
            }else{
                var logros = resp[0].logros;
                localStorage["misLogros"] = logros;
                window.location = 'logros.html';
            }
        }
    });
}


