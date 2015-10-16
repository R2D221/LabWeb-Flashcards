$(document).ready(function(){
        var miGrupo,miDescripcion,miOpA,miOpB,miOpC,miOpD,miRespuesta,miCategoria;
        $("#alta").click(function(){
            miGrupo=$("#grupo").val();
            miDescripcion=$("#descrip").val();
            miOpA=$("#op1").val();
            miOpB=$("#op2").val();
            miOpC=$("#op3").val();
            miOpD=$("#op4").val();
            miRespuesta=$("#respuesta").val();
            miCategoria=$("#categoria").val();
            
            $.ajax({
                type: 'POST',
                url: '/nuevaPregunta',
                data: {grupo: miGrupo,
                    descripcion: miDescripcion,
                    opcionA: miOpA,
                    opcionB: miOpB,
                    opcionC: miOpC,
                    opcionD: miOpD,
                    respuesta: miRespuesta,
                    categoria: miCategoria},
                success: function(data){
                    if(data === "success"){
                        alert("Pregunta guardada.");
                        window.location = "agregarPregunta";
                    }else{
                        window.location = "entrada";
                    }
                }
            });
        });
    });