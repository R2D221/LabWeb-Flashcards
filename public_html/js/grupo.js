$(document).ready(function(){
        var miNombre,miDescripcion, miClave, miInicio,miFin;
        $("#alta").click(function(){
            miNombre=$("#nombre").val();
            miDescripcion=$("#descrip").val();
            miClave=$("#clave").val();
            miInicio=$("#inicio").val();
            miFin=$("#fin").val();
            
            $.ajax({
                type: 'POST',
                url: '/nuevoGrupo',
                data: {nombre: miNombre,
                    descripcion: miDescripcion,
                    clave: miClave,
                    inicio: miInicio,
                    fin: miFin},
                success: function(data){
                    window.location = "entrada";
                }
            });
        });
    });