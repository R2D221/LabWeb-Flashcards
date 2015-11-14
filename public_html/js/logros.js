var usuario = localStorage["usuario_actual"];
$(document).ready(function () {
    if(localStorage.getItem("misLogros") === null){
        $('#tablaLogros').append("Parece que no tienes ningún logro.<br />Intenta jugar un poco más.");
    }else{
        var logros = {};
        logros = JSON.parse(localStorage.getItem("misLogros"));
        var htmlCosa = "";
        if(logros.logros.length > 0){
            for(var i =0; i < logros.logros.length; i++){
                htmlCosa += "<div class=\"opcion\">"
                + "<div class=\"logro-icono\"><img src=\"" + logros.logros[i].imagen + "\" /></div>"
                + "<div class=\"drescrip\"><b>" + logros.logros[i].nombre + "</b>"
                + "<p>" + logros.logros[i].descripcion + "</p></div>"
                + "</div>";
            }
            $('#tablaLogros').append(htmlCosa);
        }else{
            $('#tablaLogros').append("Parece que no tienes ningún logro.<br />Intenta jugar un poco más.");                            
        }
    }
});