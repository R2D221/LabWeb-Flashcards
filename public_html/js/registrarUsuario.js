function entrar(){
    var usuario = document.getElementById("usuario").value;
    localStorage["usuario_actual"] = usuario;
    localStorage["nivel"] = 1;
    localStorage["fallidos"] = 0;
    localStorage["puntaje"] = 0;
}

$(document).ready(function(){
        var miUsuario, miContra;
        $("#inicio").click(function(){
            var usuario = document.getElementById("usuario").value;
            localStorage["usuario_actual"] = usuario;
            localStorage["nivel"] = 1;
            localStorage["fallidos"] = 0;
            localStorage["puntaje"] = 0;
            miUsuario=$("#usuario").val();
            miContra=$("#pass").val();
            $.ajax({
                type: 'POST',
                url: '/login',
                data: {usuario: miUsuario,
                    password: miContra},
                success: function(data){
                    if(data === 'Inicio.html'){
                        alert("Usuario/contrasena incorrectas.");
                    }
                    window.location = data;
                }
            });
        });
    });