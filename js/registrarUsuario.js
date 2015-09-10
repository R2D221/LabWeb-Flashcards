function entrar(){
    var usuario = document.getElementById("usuario").value;
    localStorage["usuario_actual"] = usuario;
    location.replace("Home.html");
}