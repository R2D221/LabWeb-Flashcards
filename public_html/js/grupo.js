$(document).ready(function(){
        var miNombre,miDescripcion, miClave, miInicio,miFin, miId;
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

        $("#actualizar").click(function(){
            miId =$("#idgrupo").val(); 
            miNombre=$("#nombre").val();
            miDescripcion=$("#descrip").val();
            miClave=$("#clave").val();
            miInicio=$("#inicio").val();
            miFin=$("#fin").val();
            
            $.ajax({
                type: 'POST',
                url: '/actualizarGrupo',
                data: {
                    idgpo: miId,
                    nombre: miNombre,
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