$(document).ready(function(){
        var miNombre,miUsuario, miContra, miCnfrm;
        $("#alta").click(function(){
            miNombre=$("#nombre").val();
            miUsuario=$("#usuario").val();
            miContra=$("#contra1").val();
            miCnfrm=$("#contra2").val();
            if(miCnfrm === miContra){
                $.ajax({
                    type: 'POST',
                    url: '/nuevoProfesor',
                    data: {nombre: miNombre,
                        usuario: miUsuario,
                        password: miContra},
                    success: function(data){
                        alert("Registro aceptado.");
                        window.location = "Inicio.html";
                    }
                });
            }else{
                alert("Los passwords no coinciden.");
            }
        });
    });