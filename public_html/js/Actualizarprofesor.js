$(document).ready(function(){

        $("#cambio").click(function(){
            $("#cambioContrasena").show();
            $("#cambio").hide();
        });

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
                        url: '/ActualizarProfesor',
                        data: {
                            password: miContra},
                        success: function(data){
                            alert("Registro aceptado.");
                            window.location = "entrada";
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