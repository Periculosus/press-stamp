function drawLineGraph(xArrays, yArrays) {
    $(".chartistEllipseGraphClass").empty();
    new Chartist.Line('.chartistEllipseGraphClass', {
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

function coordinates(x) {
    var f, f1, f2, f1A, f1B, f1C, fi, fInt;

    fi = ((angleF * Math.PI) / 180);

    var sinFi = Math.sin(fi);
    var cosFi = Math.cos(fi);

    f1A = (sinFi / a1) * (sinFi / a1) + (cosFi / b1) * (cosFi / b1);

    f1B = -( (2 * cosFi * (sinFi * (x - lr1 * cosFi) + lr1 * cosFi * sinFi)) / (b1 * b1) ) -
        ( (2 * sinFi * (lr1 * Math.pow(sinFi, 2) - cosFi * (x - lr1 * cosFi))) / (a1 * a1) );

    f1C = Math.pow(sinFi * (x - lr1 * cosFi) + lr1 * cosFi * sinFi, 2) / (b1 * b1) + Math.pow(lr1 * sinFi * sinFi - cosFi * (x - lr1 * cosFi), 2) / (a1 * a1) - 1;

    f1 = (-f1B - Math.pow((f1B * f1B - 4 * f1A * f1C), 1 / 2)) / (2 * f1A);

    f2 = Math.pow(1 - Math.pow((x - lr2) / a2, 2), 1 / 2) * b2;

    f = f1 - f2;

    fInt = f2 - f1;

    return {
        f1: f1,
        f2: f2,
        f: f,
        fInt: fInt
    };
}

function calculateK() {

    var result;
    var h = R1 / 10000;
    var x1 = 0;
    var MIN = 0.1;
    var xt1 = x1;
    var eps1;

    var x2 = x1 + MIN;
    var MIN2 = 0.1;
    var xt2 = x2;
    var eps2;

    var x1Intersecting, x2Intersecting;

    var a, b, n, step, SAreaIntegral;
    var nArray = [];


    while (x1 <= R1 / 2 && MIN > 0.0001) {
        try {
            result = coordinates(x1);
            eps1 = Math.abs(result.f);
            if (eps1 < MIN) {
                MIN = eps1;
                xt1 = x1;
            }
            x1 += h;
        }
        catch (err) {
            x1 += h;
        }
    }
    ////////////////////////////////////////


    while (x2 <= R1) {
        try {
            result = coordinates(x2);
            eps2 = Math.abs(result.f);
            if (eps2 < MIN2) {
                MIN2 = eps2;
                xt2 = x2;
            }
            x2 += h;
        }
        catch (err) {
            x2 += h;
        }
    }
    ////////////////////////////////////////

    x1Intersecting = xt1;
    x2Intersecting = xt2;

    a = x1Intersecting;
    b = x2Intersecting;
    n = 100;
    step = (b - a) / n;
    nArray[0] = a;
    result = coordinates(nArray[0]);
    SAreaIntegral = result.fInt;

    for (var i = 1; i < n; i++) {
        nArray[i] = nArray[i - 1] + step;
        result = coordinates(nArray[i] + step / 2);
        SAreaIntegral = SAreaIntegral + result.fInt;
    }

    SAreaIntegral = SAreaIntegral * step;
    ///////////////////////////////////////
    var SAreaEllipse1 = Math.PI * a1 * b1;
    var KAreaEllipse1 = SAreaIntegral / SAreaEllipse1;

    return KAreaEllipse1;

}

function readVarsDara(){
    window.a1 = parseInt($("input[name='a1']").val());
    window.b1 = parseInt($("input[name='b1']").val());
    window.a2 = parseInt($("input[name='a2']").val());
    window.b2 = parseInt($("input[name='b2']").val());
    window.R1 = 70;
    window.R2 = 80;
    window.lr1 = parseInt($("input[name='LR1']").val());
    window.lr2 = parseInt($("input[name='LR2']").val());
    window.angleF = parseInt($("input[name='angleF']").val());
}
/*
function ratioGraphCalcUndDraw(number1, number2) {
    $("textarea").empty();
    readVarsDara();

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(calculateK()) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = calculateK();
        XR12[i] = (number1/number2).toFixed(3);
        number1 = number1 + 5;
        number2 = number2 + 10;
    }
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("a12 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
}
*/

$("input[value='a12']").click(function () {
    $("textarea").empty();
    readVarsDara();

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(calculateK()) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = calculateK();
        XR12[i] = (a1/a2).toFixed(3);
        a1 = a1 + 5;
        a2 = a2 + 10;
    }
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("a1/a2 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});

$("input[value='b12']").click(function () {
    $("textarea").empty();
    readVarsDara();

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(calculateK()) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = calculateK();
        XR12[i] = (b1/b2).toFixed(3);
        b1 = b1 + 5;
        b2 = b2 + 10;
    }
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("b1/b2 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});

$("input[value='ab1']").click(function () {
    $("textarea").empty();
    readVarsDara();

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(calculateK()) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = calculateK();
        XR12[i] = (a1/b1).toFixed(3);
        b1 = b1 + 5;
        a1 = a1 + 10;
    }
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("a1/b1 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});

$("input[value='ab2']").click(function () {
    $("textarea").empty();
    readVarsDara();

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(calculateK()) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = calculateK();
        XR12[i] = (a2/b2).toFixed(3);
        a2 = a2 + 5;
        b2 = b2 + 10;
    }
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("a2/b2 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});

$("input[value='lr12']").click(function () {
    $("textarea").empty();
    readVarsDara();

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(calculateK()) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = calculateK();
        XR12[i] = (lr1/lr2).toFixed(3);
        lr1 = lr1 + 5;
        lr2 = lr2 + 10;
    }
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("lr1/lr2 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});


$("input[value='angle']").click(function () {
    $("textarea").empty();
    readVarsDara();

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(calculateK()) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = calculateK();
        XR12[i] = (angleF).toFixed(3);
        angleF = angleF + 5;
    }
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("angle = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});

