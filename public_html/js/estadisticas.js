$(document).ready(function(){
        $("#acepta").click(function(){
            miGrupo=$("#grupo").val();
            $.ajax({
                type: 'POST',
                url: '/estadisticas',
                data: {grupo: miGrupo},
                success: function(data){
                    var i = 1;
                    var res = "<table id=\"data-table\"><thead><tr><td></td>";
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
                    createGraph('#data-table', '#preguntas');
                }
            });
        });
    });
    
//Creado a partir del siguiente ejemplo: http://www.smashingmagazine.com/2011/09/create-an-animated-bar-graph-with-html-css-and-jquery/
function createGraph(data, container) {
    var bars = [];
    var figureContainer = $('<div id="figure"></div>');
    var graphContainer = $('<div class="graph"></div>');
    var barContainer = $('<div class="bars"></div>');
    var data = $(data);
    var container = $(container);

    var barTimer;
    var graphTimer;

    var tableData = {
        chartData: function() {
            var chartData = [];
            data.find('tbody td').each(function() {
                chartData.push($(this).text());
            });
            return chartData;
       },
       chartHeading: function() {
           return "Los resultados de las respuestas de sus alumnos en el grupo seleccionado.";
       },
       chartLegend: function() {
            var chartLegend = [];
            data.find('tbody th').each(function() {
                chartLegend.push($(this).text());
            });
            return chartLegend;
       },
       chartYMax: function() {
            return 30;
       },
       yLegend: function() {
            var chartYMax = this.chartYMax();
            var yLegend = [];
            var yAxisMarkings = 4;						
            for (var i = 1; i <= yAxisMarkings; i++) {
                yLegend.unshift(chartYMax * i * (1 / yAxisMarkings));
            }
            return yLegend;
       },
       xLegend: function() {
            var xHeader = [];
            data.find('thead th').each(function() {
                xHeader.push($(this).text());
            });
            return xHeader;
       },
       columnGroups: function() {
            var columnGroups = [];
            var columns = data.find('tbody tr:eq(0) td').length;
            for (var i = 0; i < columns; i++) {
                columnGroups[i] = [];
                data.find('tbody tr').each(function() {
                    columnGroups[i].push($(this).find('td').eq(i).text());
                });
            }
            return columnGroups;
       }
    };
        
    var chartData = tableData.chartData();		
    var chartYMax = tableData.chartYMax();
    var columnGroups = tableData.columnGroups();
    
    $.each(columnGroups, function(i) {
        var barGroup = $('<div class="bar-group"></div>');
        for (var j = 0, k = columnGroups[i].length; j < k; j++) {
            var barObj = {};
            barObj.label = this[j];
            barObj.height = Math.floor(barObj.label / chartYMax * 100) + '%';
            barObj.bar = $('<div class="bar fig' + j + '"><span>' + barObj.label + '</span></div>').appendTo(barGroup);
            bars.push(barObj);
        }
        barGroup.appendTo(barContainer);			
    });
    
    var heading = $('<h4>' + tableData.chartHeading() + '</h4>');
    heading.appendTo(figureContainer);
    
    var chartLegend = tableData.chartLegend();
    var legendList = $('<ul class="legend"></ul>');
    $.each(chartLegend, function(i) {			
            var listItem = $('<li><span class="icon fig' + i + '"></span>' + this + '</li>').appendTo(legendList);
    });
    legendList.appendTo(figureContainer);
    
    var xLegend = tableData.xLegend();		
    var xAxisList = $('<ul class="x-axis"></ul>');
    $.each(xLegend, function(i) {			
            var listItem = $('<li><span>' + this + '</span></li>')
                    .appendTo(xAxisList);
    });
    xAxisList.appendTo(graphContainer);

    var yLegend	= tableData.yLegend();
    var yAxisList	= $('<ul class="y-axis"></ul>');
    $.each(yLegend, function(i) {			
            var listItem = $('<li><span>' + this + '</span></li>')
                    .appendTo(yAxisList);
    });
    yAxisList.appendTo(graphContainer);		

    barContainer.appendTo(graphContainer);			
    graphContainer.appendTo(figureContainer);
    figureContainer.appendTo(container);

    function displayGraph(bars, i) {		
        if (i < bars.length) {
            $(bars[i].bar).animate({
                height: bars[i].height
            }, 800);
            barTimer = setTimeout(function() {
                i++;				
                displayGraph(bars, i);
            }, 100);
        }
    }

    function resetGraph() {
        $.each(bars, function(i) {
                $(bars[i].bar).stop().css('height', 0);
        });

        clearTimeout(barTimer);
        clearTimeout(graphTimer);

        graphTimer = setTimeout(function() {		
                displayGraph(bars, 0);
        }, 200);
    }

    resetGraph();
}