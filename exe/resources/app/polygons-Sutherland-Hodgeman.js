function clip(subjectPolygon, clipPolygon) {

    var cp1, cp2, s, e;
    var inside = function (p) {
        return (cp2[0]-cp1[0])*(p[1]-cp1[1]) > (cp2[1]-cp1[1])*(p[0]-cp1[0]);
    };
    var intersection = function () {
        var dc = [ cp1[0] - cp2[0], cp1[1] - cp2[1] ],
            dp = [ s[0] - e[0], s[1] - e[1] ],
            n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0],
            n2 = s[0] * e[1] - s[1] * e[0],
            n3 = 1.0 / (dc[0] * dp[1] - dc[1] * dp[0]);
        return [(n1*dp[0] - n2*dc[0]) * n3, (n1*dp[1] - n2*dc[1]) * n3];
    };
    var outputList = subjectPolygon;
    cp1 = clipPolygon[clipPolygon.length-1];
    for (j in clipPolygon) {
        var cp2 = clipPolygon[j];
        var inputList = outputList;
        outputList = [];
        s = inputList[inputList.length - 1]; //last on the input list
        for (i in inputList) {
            var e = inputList[i];
            if (inside(e)) {
                if (!inside(s)) {
                    outputList.push(intersection());
                }
                outputList.push(e);
            }
            else if (inside(s)) {
                outputList.push(intersection());
            }
            s = e;
        }
        cp1 = cp2;
    }
    return outputList
}

// function for researching center coordinates of regular/irregular polygon
function centroid(polygon) {
    var centerCoordinates = new Array(2),
        sumX = 0, sumY = 0;
    for (var i = 0; i < polygon.length; i++) {
        sumX += polygon[i][0];
        sumY += polygon[i][1];
    }
    centerCoordinates[0] = sumX / polygon.length;
    centerCoordinates[1] = sumY / polygon.length;

    return centerCoordinates;
}
/* // test function clip()
function drawPolygon(context, polygon, strokeStyle, fillStyle) {

    var heightOfCanvas = $("#polygonsId").height();

    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;
    context.beginPath();

    context.moveTo(polygon[0][0],heightOfCanvas-polygon[0][1]); //first vertex
    for (var i = 1; i < polygon.length ; i++)
        context.lineTo(polygon[i][0], heightOfCanvas-polygon[i][1]);
    context.lineTo(polygon[0][0], heightOfCanvas-polygon[0][1]); //back to start

    context.fill();
    context.stroke();
    context.closePath();
}

window.onload = function () {
    var context = document.getElementById('polygonsId').getContext('2d');
    // var subjectPolygon = [[50, 150], [200, 50], [350, 150], [350, 300], [250, 300], [200, 250], [150, 350], [100, 250], [100, 200]],
    //     clipPolygon = [[0, 0], [300, 0], [400, 400], [0, 300]];


    var subjectPolygon = [[10, 10], [70, 50], [80, 35]],
        clipPolygon = [[20, 20], [77, 0], [0, 90]];

    var clippedPolygon = clip(subjectPolygon, clipPolygon);
    drawPolygon(context, clipPolygon, '#888','#88f');
    drawPolygon(context, subjectPolygon, '#888','#8f8');
    drawPolygon(context, clippedPolygon, '#000','#0ff');

    $("#divTestId").append("coordinates = " + clippedPolygon.length);

     for(var i = 0; i < clippedPolygon.length; i++) {
         $("#divTestId").append("<br>(X"+"<sub>"+(i+1)+"</sub>"+"; Y"+"<sub>"+(i+1)+"</sub>"+") = ("+clippedPolygon[i]+")");
     }
}
*/