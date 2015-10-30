$(document).ready(function(){
        var miNombre,miUsuario, miContra, miCnfrm;
        $("#alta").click(function(){
            miNombre=$("#nombre").val();
            miUsuario=$("#usuario").val();
            miContra=$("#contra1").val();
            miCnfrm=$("#contra2").val();
            if(miCnfrm != "" && miNombre != "" && miUsuario != "" && miContra != ""){
                if(miCnfrm === miContra){
                    $.ajax({
                        type: 'POST',
                        url: '/nuevoProfesor',
                        data: {nombre: miNombre,
                            usuario: miUsuario,
                            password: miContra},
                        success: function(data){
                            alert("Registro aceptado.");
                            window.location = "administrador";
                        }
                    });
                }else{
                    alert("Los passwords no coinciden.");
                }
            }else{
                alert("Todos los campos son necesarios.");
            }
        });
    });