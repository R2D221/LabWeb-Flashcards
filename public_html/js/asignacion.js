$(document).ready(function(){
        var miGrupo;
        $("#asignar").click(function(){
            miGrupo=$("#grupo").val();

        var misAlumnos = [];
        var checkAlum = document.getElementsByClassName("checkbox");

        for (var i = 0 ; i < checkAlum.length; i++) {
            if (checkAlum[i].checked) {
                misAlumnos.push(checkAlum[i].value);
            }
        }
        
        var elJSON = JSON.stringify(misAlumnos);
        $.ajax({
            type: 'POST',
            url: '/asignaAlumnos',
            data: {idGrupo: miGrupo,
                alumnos: elJSON},
            success: function(data){
                alert("Registro exitoso.");
                window.location = "administrador";
            }
        });
    });
});