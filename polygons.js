$("#fillDataPolygonID").click(function () {
    $("#upperCircleRadiusId").val(90);
    $("#lowerCircleRadiusId").val(100);

    // http://stackoverflow.com/questions/3436453/calculate-coordinates-of-a-regular-polygons-vertices
    /*
     The angle you need is angle = 2 * pi / numPoints.

     Then starting vertically above the origin with the size of the polygon being given by radius:

     for (int i = 0; i < numPoints; i++)
     {
     x = centreX + radius * sin(i * angle);
     y = centreY + radius * cos(i * angle);
     }
     */

    $("input[name='xUpper']").each(function (index) {
        var regularAngle = 2 * Math.PI / $("#subjectPolygonVertexCountId").val();
        $(this).val((40 + 20 * Math.sin((index + 1) * regularAngle)).toFixed(0));
    });
    $("input[name='yUpper']").each(function (index) {
        var regularAngle = 2 * Math.PI / $("#subjectPolygonVertexCountId").val();
        $(this).val((40 + 20 * Math.cos((index + 1) * regularAngle)).toFixed(0));
    });

    $("input[name='xLower']").each(function (index) {
        var regularAngle = 2 * Math.PI / $("#clipPolygonVertexCountId").val();
        if(index == 1){
            $(this).val(70);
        }
        else $(this).val((30 + 20 * Math.sin((index + 1) * regularAngle)).toFixed(0));
    });
    $("input[name='yLower']").each(function (index) {
        var regularAngle = 2 * Math.PI / $("#clipPolygonVertexCountId").val();
        $(this).val((30 + 25 * Math.cos((index + 1) * regularAngle)).toFixed(0));
    });

});

$("#savePolygonGraphID").click(function () {
    var today = new Date();
    var date = today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    var fullTime = "-date" + date + "-time" + time;

    var graph = document.getElementById("coordinateSystemId");
    graph.toBlob(function(blob) {
        saveAs(blob, "graphPolygon" + fullTime + ".png");
    });

    var inputData = $("#coordinatesOutputsId").text();
    var text = new Blob([inputData], {type: "text/plain;charset=utf-8"});
    saveAs(text, "dataPolygon" + fullTime + ".txt");

    sweetAlert("Saved");
});

$("#runScriptId").click(function () {
    $("#subjectPolygonInputDataId").empty();
    $("#clipPolygonInputDataId").empty();
    $("#coordinatesOutputsId").empty();
    //clear canvas
    myGraph.clearCanvas();

    var subjectPolygonVertexCount = $("input[name='subjectPolygonVertexCount']").val(),
        clipPolygonVertexCount = $("input[name='clipPolygonVertexCount']").val();

    $("#subjectPolygonInputDataId").append("Координаты<br>многоугольника на<br><b>верхней</b> пластине<br><i>(подвижной)</i>");
    for (var i = 0; i < subjectPolygonVertexCount; i++) {
        $("#subjectPolygonInputDataId").append("<br>x" + "<sub>" + (i + 1) + "</sub>" +" = <input type='text' name='xUpper'> " +
                                                    "y" + "<sub>" + (i + 1) + "</sub>" +" = <input type='text' name='yUpper'>");
    }

    $("#clipPolygonInputDataId").append("Координаты<br>многоугольника на<br><b>нижней</b> пластине<br><i>(неподвижной)</i>");
    for (i = 0; i < clipPolygonVertexCount; i++) {
        $("#clipPolygonInputDataId").append("<br>x" + "<sub>" + (i + 1) + "</sub>" +" = <input type='text' name='xLower'> " +
                                                    "y" + "<sub>" + (i + 1) + "</sub>" +" = <input type='text' name='yLower'>");
    }

    $("#inputDataId").show();
    // reDraw coordinate system in max lvl
    myGraph.drawXAxis();
    myGraph.drawYAxis();
});

$("#readInputId").click(function () {
    $("#coordinatesOutputsId").empty();
    //clear canvas
    myGraph.clearCanvas();

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var upperCircleRadius = $("#upperCircleRadiusId").val(),
        lowerCircleRadius = $("#lowerCircleRadiusId").val();

    myGraph.drawCircle(function () {}, 0, 0, upperCircleRadius, "#6599FF", 5);
    myGraph.drawCircle(function () {}, 0, 0, lowerCircleRadius, "#098d70", 5);

    var subjectPolygon = [];
    var clipPolygon = [];
    var crutchX = [];
    var crutchY = [];

    $("#subjectPolygonInputDataId input[name$='xUpper']").each(function (index) {
        crutchX[index] = parseInt($(this).val());
    });
    $("#subjectPolygonInputDataId input[name^='yUpper']").each(function (index) {
        crutchY[index] = parseInt($(this).val());
    });
    for(var rows = 0; rows < crutchX.length; rows++) {
        subjectPolygon.push([crutchX[rows], crutchY[rows]]);
    }

    crutchX = [];
    crutchY = [];

    $("div#clipPolygonInputDataId input[name^='xLower']").each(function (index) {
        crutchX[index] = parseInt($(this).val());
    });
    $("div#clipPolygonInputDataId input[name^='yLower']").each(function (index) {
        crutchY[index] = parseInt($(this).val());
    });
    for(rows = 0; rows < crutchX.length; rows++) {
        clipPolygon.push([crutchX[rows], crutchY[rows]]);
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//           var subjectPolygon = [[10, 10], [70, 30], [50, 50]],
//               clipPolygon = [[20, 20], [77, 0], [0, 90]];
    var clippedPolygon = clip(subjectPolygon, clipPolygon);

//            alert("subjectPolygon = " + subjectPolygon + " clipPolygon = " + clipPolygon);

    myGraph.drawPolygons(function () {}, subjectPolygon, '#363636', '#6599FF', 1);
    myGraph.drawPolygons(function () {}, clipPolygon, '#363636', '#097054', 1);
    myGraph.drawPolygons(function () {}, clippedPolygon, '#FFDE00', '#FF9900', 2);

    // reDraw coordinate system in max lvl
    myGraph.drawXAxis();
    myGraph.drawYAxis();

    $("#coordinatesOutputsId").append("<b>Количество координат<br>пересечения:</b> " + clippedPolygon.length);

    for (var i = 0; i < clippedPolygon.length; i++) {
        $("#coordinatesOutputsId").append("<br><b>(X" + "<sub>" + (i + 1) + "</sub>" + "; Y" + "<sub>" + (i + 1) + "</sub>" + ")</b> = (" +
            clippedPolygon[i][0].toFixed(3) + "; " + clippedPolygon[i][1].toFixed(3) + ")");
    }

    // polygon area calculation
    // http://www.mathwords.com/a/area_convex_polygon.htm
    var areaCoordinatesClippedPolygon = clip(subjectPolygon, clipPolygon);
    var XnYn_plus_1 = 0, YnXn_plus_1 = 0;

    areaCoordinatesClippedPolygon.push(areaCoordinatesClippedPolygon[0]);
    for (var j = 0; j < areaCoordinatesClippedPolygon.length; j++) {
        if ((j + 1) < areaCoordinatesClippedPolygon.length) {
            XnYn_plus_1 = XnYn_plus_1 + (areaCoordinatesClippedPolygon[j][0] * areaCoordinatesClippedPolygon[j + 1][1]);
            YnXn_plus_1 = YnXn_plus_1 + (areaCoordinatesClippedPolygon[j][1] * areaCoordinatesClippedPolygon[j + 1][0]);
        }
    }
    var areaClippedPolygon = 1 / 2 * Math.abs((XnYn_plus_1) - (YnXn_plus_1));
    $("#coordinatesOutputsId").append("<br><b>Площадь пересечения<br>многоугольников <br>S = </b>" + areaClippedPolygon.toFixed(3) + " см<sup>2</sup>");

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var centroidAxis = centroid(clippedPolygon);
    $("#coordinatesOutputsId").append("<br><b>Центроид = </b>(" + centroidAxis[0].toFixed(3) + "; " + centroidAxis[1].toFixed(3) + ")");
    myGraph.drawCoordinate(function () {}, centroidAxis[0].toFixed(3), centroidAxis[1].toFixed(3), 1, 1);
    //radius from R1 ro ellipse 1
//            myGraph.drawLine(function(){}, 0, 0, centroidAxis[0], centroidAxis[1], 'black', 1);

});
