$(document).ready(function(){
        var miNombre, miCorreo, miUsuario, miContra, miCnfrm;
        $("#alta").click(function(){
            miNombre=$("#nombre").val();
            miCorreo=$("#correo").val();
            miUsuario=$("#usuario").val();
            miContra=$("#contra1").val();
            miCnfrm=$("#contra2").val();
            if(miCnfrm != "" && miNombre != "" && miCorreo != "" && miUsuario != "" && miContra != ""){
                if(miCnfrm === miContra){
                    $.ajax({
                        type: 'POST',
                        url: '/nuevoAlumno',
                        data: {nombre: miNombre,
                            usuario: miUsuario,
                            password: miContra,
                            correo: miCorreo},
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