$(document).ready(function(){
        $("#acepta").click(function(){
            miGrupo=$("#grupo").val();
            $.ajax({
                type: 'POST',
                url: '/estadisticas',
                data: {grupo: miGrupo},
                success: function(data){
                    var i = 1;
                    var res = "<table><thead><tr><td>";
                    $.each(data.titulos, function(index, value){
                        res += "<th>" + value.id_pregunta + "</th>";
                    });
                    res += "</tr></thead><tbody><tr><th>A</th>";
                    $.each(data.datos, function(index, value){
                        res += "<td>" + value.conteo + "</td>";
                        if(index < (data.datos.length - 1)){
                            if(value.respuesta !== data.datos[index + 1].respuesta){
                                res += "</tr>";
                                switch(i){
                                    case 1:
                                        res += "<tr><th>B</th>";
                                        break;
                                    case 2:
                                        res += "<tr><th>C</th>";
                                        break;
                                    case 3:
                                        res += "<tr><th>D</th>";
                                        break;
                                }
                                i++;
                            }
                        }
                    });
                    res += "</tr></tbody></table>";
                    $("#preguntas").css('opacity','1').html(res);
                }
            });
        });
    });