function drawLineGraph(xArrays, yArrays) {
    $(".chartistCircleGraphClass").empty();
    new Chartist.Line('.chartistCircleGraphClass', {
        labels: xArrays,
        series: [
            yArrays
        ]
    }, {
        fullWidth: true,
        chartPadding: {
            right: 40
        }
    });
}
function sqr(number) {
    return Math.pow(number, 2);
}

function intersectingCircleCalc(R1, R2, LR1, LR2, angle) {
    var K_d = Math.sqrt(sqr(LR1) + sqr(LR2) -2 * LR1 * LR2 * Math.cos(angle * Math.PI/180));
    var K_w = R2 / R1;
    var K_cos_alpha = (sqr(R2) - sqr(R1) - sqr(K_d)) / (-2 * R1 * K_d);
    var K_cos_beta = (sqr(R1) - sqr(R2) - sqr(K_d)) / (-2 * R2 * K_d);
    var K_alpha = Math.acos(K_cos_alpha) * 180 / Math.PI;
    var K_beta = Math.acos(K_cos_beta) * 180 / Math.PI;
    var K_K = (K_alpha * (Math.PI / 180) - 0.5 * Math.sin (2 * K_alpha * (Math.PI / 180)) +
        sqr(K_w) * (K_beta * (Math.PI / 180) - 0.5 * Math.sin(2 * K_beta * (Math.PI / 180)))) / Math.PI;

    return K_K;
}



$("input[value='R12']").click(function () {
    $("textarea").empty();

    var R1 = parseInt($("input[name='R1']").val());
    var R2 = parseInt($("input[name='R2']").val());
    var LR1 = parseInt($("input[name='LR1']").val());
    var LR2 = parseInt($("input[name='LR2']").val());
    var angle = parseInt($("input[name='angle']").val());

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(intersectingCircleCalc(R1, R2, LR1, LR2, angle)) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = intersectingCircleCalc(R1, R2, LR1, LR2, angle);
        XR12[i] = (R1 / R2).toFixed(3);
        R1 = R1 + 5;
        R2 = R2 + 10;
    }
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("R1/R2 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});
$("input[value='LR12']").click(function () {
    $("textarea").empty();

    var R1 = parseInt($("input[name='R1']").val());
    var R2 = parseInt($("input[name='R2']").val());
    var LR1 = parseInt($("input[name='LR1']").val());
    var LR2 = parseInt($("input[name='LR2']").val());
    var angle = parseInt($("input[name='angle']").val());

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(intersectingCircleCalc(R1, R2, LR1, LR2, angle)) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = intersectingCircleCalc(R1, R2, LR1, LR2, angle);
        XR12[i] = (LR1 / LR2).toFixed(3);
        LR1 = LR1 + 5;
        LR2 = LR2 + 10;
    }
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("LR1/LR2 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});
$("input[value='RLR1']").click(function () {
    $("textarea").empty();

    var R1 = parseInt($("input[name='R1']").val());
    var R2 = parseInt($("input[name='R2']").val());
    var LR1 = parseInt($("input[name='LR1']").val());
    var LR2 = parseInt($("input[name='LR2']").val());
    var angle = parseInt($("input[name='angle']").val());

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(intersectingCircleCalc(R1, R2, LR1, LR2, angle)) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = intersectingCircleCalc(R1, R2, LR1, LR2, angle);
        XR12[i] = (LR1 / R1).toFixed(3);
        LR1 = LR1 + 5;
        R1 = R1 + 10;
    }
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("LR1/R1 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});
$("input[value='RLR2']").click(function () {
    $("textarea");

    var R1 = parseInt($("input[name='R1']").val());
    var R2 = parseInt($("input[name='R2']").val());
    var LR1 = parseInt($("input[name='LR1']").val());
    var LR2 = parseInt($("input[name='LR2']").val());
    var angle = parseInt($("input[name='angle']").val());

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(intersectingCircleCalc(R1, R2, LR1, LR2, angle)) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = intersectingCircleCalc(R1, R2, LR1, LR2, angle);
        XR12[i] = (LR2 / R2).toFixed(3);
        R2 = R2 + 5;
        LR2 = LR2 + 10;
    }
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("LR2/R2 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});
$("input[value='angle']").click(function () {
    $("textarea").empty();

    var R1 = parseInt($("input[name='R1']").val());
    var R2 = parseInt($("input[name='R2']").val());
    var LR1 = parseInt($("input[name='LR1']").val());
    var LR2 = parseInt($("input[name='LR2']").val());
    var angle = parseInt($("input[name='angle']").val());

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 15; i++) {
        if(isNaN(intersectingCircleCalc(R1, R2, LR1, LR2, angle)) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = intersectingCircleCalc(R1, R2, LR1, LR2, angle);
        XR12[i] = (angle).toFixed(1);
        angle = angle + 5;
    }
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("angle = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});