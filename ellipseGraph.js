var ellipseGraph = new Graph({
    canvasId: 'coordinateSystemEllipseGraphicsId',
    minX: -0.05,
    minY: -1.05,
    maxX: 1.05,
    maxY: 0.05,
    unitsPerTickX: 0.1,
    unitsPerTickY: 0.1
});

window.dotWidth = 0.01;
window.dotHeight = 0.01;

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

function calculateGraph() {

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

//            result = coordinates(xt1);
    x1Intersecting = xt1;
//            y1Intersecting = result.f2;
//        $("output[name='x1']").empty().text(xt1.toFixed(3));
//        $("output[name='y1']").empty().text(result.f2.toFixed(3));
//            result = coordinates(xt2);
    x2Intersecting = xt2;
//            y2Intersecting = result.f2;
//        $("output[name='x2']").empty().text(xt2.toFixed(3));
//        $("output[name='y2']").empty().text(result.f2.toFixed(3));
    ////////////////////////////////////////

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

window.a1 = 0;
window.b1 = 0;
window.a2 = 0;
window.b2 = 0;
window.R1 = 0;
window.R2 = 0;
window.lr1 = 0;
window.lr2 = 0;
window.angleF = 0;

/*
 a1 = $("input[name='a1']").val();
 b1 = $("input[name='b1']").val();
 a2 = $("input[name='a2']").val();
 b2 = $("input[name='b2']").val();
 R1 = 70;
 R2 = 80;
 lr1 = $("input[name='LR1']").val();
 lr2 = $("input[name='LR2']").val();
 angleF = $("input[name='angleF']").val();
 */

function defaultInputData() {
    a1 = 21;
    b1 = 17;
    a2 = 25;
    b2 = 15;
    R1 = 70;
    R2 = 80;
    lr1 = 30;
    lr2 = 35;
    angleF = 21;
}

$("input[value='a12']").click(function () {

    defaultInputData();

    var a12;

    ellipseGraph.clearCanvas();
    ellipseGraph.drawXAxis();
    ellipseGraph.drawYAxis();

    for (var step = 0; step < 15; step++) {
        a12 = a1 / a2;
        ellipseGraph.drawCoordinate(function () {
        }, a12, calculateGraph(), dotWidth, dotHeight);
        a1 = a1 + 5;
        a2 = a2 + 10;
    }

});

$("input[value='b12']").click(function () {

    defaultInputData();

    var b12;

    ellipseGraph.clearCanvas();
    ellipseGraph.drawXAxis();
    ellipseGraph.drawYAxis();

    for (var step = 0; step < 15; step++) {
        b12 = b1 / b2;
        ellipseGraph.drawCoordinate(function () {
        }, b12, calculateGraph(), dotWidth, dotHeight);
        b1 = b1 + 5;
        b2 = b2 + 10;
    }

});

$("input[value='ab1']").click(function () {

    defaultInputData();

    var ab1;

    ellipseGraph.clearCanvas();
    ellipseGraph.drawXAxis();
    ellipseGraph.drawYAxis();

    for (var step = 0; step < 15; step++) {
        ab1 = a1 / b1;
        ellipseGraph.drawCoordinate(function () {
        }, ab1, calculateGraph(), dotWidth, dotHeight);
        a1 = a1 + 5;
        b1 = b1 + 10;
    }

});

$("input[value='ab2']").click(function () {

    defaultInputData();

    var ab2;

    ellipseGraph.clearCanvas();
    ellipseGraph.drawXAxis();
    ellipseGraph.drawYAxis();

    for (var step = 0; step < 15; step++) {
        ab2 = a2 / b2;
        ellipseGraph.drawCoordinate(function () {
        }, ab2, calculateGraph(), dotWidth, dotHeight);
        a2 = a2 + 5;
        b2 = b2 + 10;
    }

});

$("input[value='lr12']").click(function () {

    defaultInputData();

    var lr12;

    ellipseGraph.clearCanvas();
    ellipseGraph.drawXAxis();
    ellipseGraph.drawYAxis();

    for (var step = 0; step < 15; step++) {
        lr12 = lr1 / lr2;
        ellipseGraph.drawCoordinate(function () {
        }, lr12, calculateGraph(), dotWidth, dotHeight);
        lr1 = lr1 + 5;
        lr2 = lr2 + 10;
    }

});


$("input[value='angle']").click(function () {

    var ellipseGraphAngle = new Graph({
        canvasId: 'coordinateSystemEllipseGraphicsId',
        minX: -5,
        minY: -5.2,
        maxX: 90,
        maxY: 0.5,
        unitsPerTickX: 5,
        unitsPerTickY: 0.5
    });

    defaultInputData();

    ellipseGraphAngle.clearCanvas();
    ellipseGraphAngle.drawXAxis();
    ellipseGraphAngle.drawYAxis();

    for (var step = 0; step < 15; step++) {
        ellipseGraphAngle.drawCoordinate(function () {
        }, angleF, calculateGraph(), 0.7, 0.05);
        if (angleF > 90) {
            break;
        }
        angleF = angleF + 5;
    }

})

