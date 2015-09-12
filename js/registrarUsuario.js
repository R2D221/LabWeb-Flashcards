function entrar(){
    var usuario = document.getElementById("usuario").value;
    localStorage["usuario_actual"] = usuario;
    localStorage["nivel"] = 1;
    localStorage["puntaje"] = 0;
    location.replace("Home.html");
}