$(document).ready(function(){
        var miNombre,miUsuario, miContra, miCnfrm;
        $("#alta").click(function(){
            miNombre=$("#nombre").val();
            miUsuario=$("#usuario").val();
            miContra=$("#contra1").val();
            miCnfrm=$("#contra2").val();
            if(miCnfrm === miContra){
                $.post("http://localhost:3000/nuevoProfesor",
                {nombre: miNombre,
                    usuario: miUsuario,
                    password: miContra}, function(data){
                    if(data==='done')
                    {
                        alert("Maestro registrado");
                    }
                });
            }else{
                alert("Los passwords no coinciden.");
            }
        });
    });