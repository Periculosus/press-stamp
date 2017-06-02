window.onload = $("body").hide().fadeIn(2000);

$("#drawCircleGraphID").click(function () {
    window.open('circleGraph.html', '', "width=705,height=700");
});
$("#infoId").click(function () {
    window.open('zInfoCircle.html', '', "width=750,height=800");
});


$("#fillDataCircleID").click(function () {
    $("input[name='upperR1']").val(83);
    $("input[name='lowerR2']").val(93);
    $("input[name='R1']").val(30);
    $("input[name='R2']").val(33);
    $("input[name='LR1']").val(42);
    $("input[name='LR2']").val(48);
    $("input[name='angle']").val(37);

    //local storage
    localStorage.setItem("circleLsR1", 30);
    localStorage.setItem("circleLsR2", 33);
    localStorage.setItem("circleLsLR1", 42);
    localStorage.setItem("circleLsLR2", 48);
    localStorage.setItem("circleLsAngle", 37);
    //local storage
});

$("#saveCircleGraphID").click(function () {
    var today = new Date();
    var date = today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    var fullTime = "-date" + date + "-time" + time;

    var graph = document.getElementById("coordinateSystemCircleId");
    graph.toBlob(function(blob) {
        saveAs(blob, "graphCircle" + fullTime + ".png");
    });

    var inputData = $("#outputDataID").text();
    var text = new Blob([inputData], {type: "text/plain;charset=utf-8"});
    saveAs(text, "dataCircle" + fullTime + ".txt");

    sweetAlert("Saved", "to file", "success");
});

var circleIntersecting = new Graph({
    canvasId: 'coordinateSystemCircleId',
    minX: -100,
    minY: -100,
    maxX: 100,
    maxY: 100,
    unitsPerTickX: 10,
    unitsPerTickY: 10
});

function intersectingCircleCalc() {
    var upperR1 = $("input[name='upperR1']").val();
    var lowerR2 = $("input[name='lowerR2']").val();
    var R1 = $("input[name='R1']").val();
    var R2 = $("input[name='R2']").val();
    var LR1 = $("input[name='LR1']").val();
    var LR2 = $("input[name='LR2']").val();
    var angle = $("input[name='angle']").val();

    var K_d = Math.sqrt(sqr(LR1) + sqr(LR2) -2 * LR1 * LR2 * Math.cos(angle * Math.PI/180));
    var K_w1 = LR1 / R1;
    var K_w2 = LR2 / R2;
    var K_w = R2 / R1;
    var K_cos_alpha = (sqr(R2) - sqr(R1) - sqr(K_d)) / (-2 * R1 * K_d);
    var K_cos_beta = (sqr(R1) - sqr(R2) - sqr(K_d)) / (-2 * R2 * K_d);
    var K_alpha = Math.acos(K_cos_alpha) * 180 / Math.PI;
    var K_beta = Math.acos(K_cos_beta) * 180 / Math.PI;
    var K_sin_alpha = Math.sin(K_alpha * Math.PI / 180);
    var K_A = K_sin_alpha;
    var K_K = (K_alpha * (Math.PI / 180) - 0.5 * Math.sin (2 * K_alpha * (Math.PI / 180)) +
        sqr(K_w) * (K_beta * (Math.PI / 180) - 0.5 * Math.sin(2 * K_beta * (Math.PI / 180)))) / Math.PI;
    var K_S_per = K_K * Math.PI * sqr(R1);

    return {
        K: K_K,
        S: K_S_per
    }
}

window.upperR1 = 0;
window.lowerR2 = 0;
window.R1 = 0;
window.R2 = 0;
window.LR1 = 0;
window.LR2 = 0;
window.angle = 0;

function sqr(number) {
    return Math.pow(number, 2);
}

$("#calculateIntersectingAreaId").click(function () {

    var upperR1 = $("input[name='upperR1']").val();
    var lowerR2 = $("input[name='lowerR2']").val();
    var R1 = $("input[name='R1']").val();
    var R2 = $("input[name='R2']").val();
    var LR1 = $("input[name='LR1']").val();
    var LR2 = $("input[name='LR2']").val();
    var angle = $("input[name='angle']").val();

    //local storage
    localStorage.setItem("circleLsR1", R1);
    localStorage.setItem("circleLsR2", R2);
    localStorage.setItem("circleLsLR1", LR1);
    localStorage.setItem("circleLsLR2", LR2);
    localStorage.setItem("circleLsAngle", angle);
    //local storage

    var K_d = Math.sqrt(sqr(LR1) + sqr(LR2) -2 * LR1 * LR2 * Math.cos(angle * Math.PI/180));
    var K_w1 = LR1 / R1;
    var K_w2 = LR2 / R2;
    var K_w = R2 / R1;
    var K_cos_alpha = (sqr(R2) - sqr(R1) - sqr(K_d)) / (-2 * R1 * K_d);
    var K_cos_beta = (sqr(R1) - sqr(R2) - sqr(K_d)) / (-2 * R2 * K_d);
    var K_alpha = Math.acos(K_cos_alpha) * 180 / Math.PI;
    var K_beta = Math.acos(K_cos_beta) * 180 / Math.PI;
    var K_sin_alpha = Math.sin(K_alpha * Math.PI / 180);
    var K_A = K_sin_alpha;
    var K_K = (K_alpha * (Math.PI / 180) - 0.5 * Math.sin (2 * K_alpha * (Math.PI / 180)) +
        sqr(K_w) * (K_beta * (Math.PI / 180) - 0.5 * Math.sin(2 * K_beta * (Math.PI / 180)))) / Math.PI;
    var K_S_per = K_K * Math.PI * sqr(R1);

    //clear canvas
    circleIntersecting.clearCanvas();
    //clear output
    $("#outputDataID").empty();

    //upper plate 1
    circleIntersecting.drawCircle(function(){}, 0, 0, upperR1, "#098d70", 5);
    //lower plate 2
    circleIntersecting.drawCircle(function(){}, 0, 0, lowerR2, "#ff2900", 5);

    /*
     x,y - coordinates of circle
     x0, y0 - coordinates of dot on circle
     x1, y1 - coordinates of dot on circle rotated
     angle - rotating angle of dot on circle

     rx = x0 - x;
     ry = y0 - y;
     cos = Math.cos(angleF * Math.PI / 180);
     sin = Math.sin(angleF * Math.PI / 180);
     x1 = x + rx * cos - ry * sin;
     y1 = y + rx * sin + ry * cos;
     */

    //default position of ellipse 1 on upper ROTATING plate 1
    var rx = LR1 - 0,
        ry = 0,
        c = Math.cos(angle * Math.PI / 180),
        s = Math.sin(angle * Math.PI / 180),
        x1 = rx * c - ry * s,
        y1 = rx * s + ry * c;
    circleIntersecting.drawCircle(function(){}, x1, y1, R1, 'green', 1, "#098d70", 0.3);
    //default position of circle 2 on lower FIXED plate 2
    circleIntersecting.drawCircle(function(){}, LR2, 0, R2, 'red', 1, "#ff2900", 0.3);

    //radius from R1 ro circle 1
    circleIntersecting.drawLine(function(){}, 0, 0, x1, y1, 'green', 1);

    // reDraw coordinate system in max lvl
    circleIntersecting.drawXAxis();
    circleIntersecting.drawYAxis();
    circleIntersecting.drawText(function(){}, "Y", -20, -90);
    circleIntersecting.drawText(function(){}, "X", 90, 15);

    sweetAlert("Результат",
        "Площадь перекрытия S  = " + K_S_per.toFixed(5) + " см2\n" +
        "Коэффициент перекрытия K = " + K_K.toFixed(5) + " см2",
        "success"
    );

    $("#outputDataID").append("<b>Площадь перекрытия S  = </b>" + K_S_per.toFixed(5) + " см<sup>2</sup><br> " +
                          "<b>Коэффициент перекрытия K = </b>" + K_K.toFixed(5) + " см<sup>2</sup><br>");

    $("#outputDataID").append("<b>R1 = </b>" + R1 +
        ", <b>R2 = </b>" + R2 +
        ", <b>LR1 = </b>" + LR1 +
        ", <b>LR2 = </b>" + LR2 +
        ", <br><b>upperR1 = </b>" + upperR1 +
        ", <b>upperR2 = </b>" + lowerR2 +
        ", <b>angle = </b>" + angle);

});

/////// local storage
/*
window.onload = function() {
    var inputR1 = prompt();
    var inputR2 = prompt();
    var inputLR1 = prompt();
    var inputLR2 = prompt();
    var angle = prompt();

    localStorage.setItem("storageName", inputR1);
    localStorage.setItem("storageName", inputR2);
    localStorage.setItem("storageName", inputLR1);
    localStorage.setItem("storageName", inputLR2);
    localStorage.setItem("storageName", angle);

};
*/
/////// local storage