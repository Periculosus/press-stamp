window.onload = $("body").fadeIn(1000);
//local storage get vars
window.onload = function () {
    $("input[name='a1']").val(localStorage.getItem("ellipseLsA1"));
    $("input[name='b1']").val(localStorage.getItem("ellipseLsB1"));
    $("input[name='a2']").val(localStorage.getItem("ellipseLsA2"));
    $("input[name='b2']").val(localStorage.getItem("ellipseLsB2"));
    $("input[name='R1']").val(localStorage.getItem("ellipseLsR1"));
    $("input[name='R2']").val(localStorage.getItem("ellipseLsR2"));
    $("input[name='LR1']").val(localStorage.getItem("ellipseLsLR1"));
    $("input[name='LR2']").val(localStorage.getItem("ellipseLsLR2"));
    $("input[name='angleF']").val(localStorage.getItem("ellipseLsAngleF"));
};

// open info
$("#infoId").click(function () {
    window.open('zInfoEllipse.html', '', "width=700,height=800");
});

// animation and draw graphs
function drawLineGraph(xArrays, yArrays) {
    $(".chartistEllipseGraphClass").empty();
    $("#coordinateSystemEllipseGraphicsId").append("<b class='yAxi'> K</b>");
    var chart = new Chartist.Line('.chartistEllipseGraphClass', {
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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////// animation
    var seq = 0,
        delays = 80,
        durations = 500;

// Once the chart is fully created we reset the sequence
    chart.on('created', function() {
        seq = 0;
    });

// On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
    chart.on('draw', function(data) {
        seq++;

        if(data.type === 'line') {
            // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
            data.element.animate({
                opacity: {
                    // The delay when we like to start the animation
                    begin: seq * delays + 1000,
                    // Duration of the animation
                    dur: durations,
                    // The value where the animation should start
                    from: 0,
                    // The value where it should end
                    to: 1
                }
            });
        } else if(data.type === 'label' && data.axis === 'x') {
            data.element.animate({
                y: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.y + 100,
                    to: data.y,
                    // We can specify an easing function from Chartist.Svg.Easing
                    easing: 'easeOutQuart'
                }
            });
        } else if(data.type === 'label' && data.axis === 'y') {
            data.element.animate({
                x: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 100,
                    to: data.x,
                    easing: 'easeOutQuart'
                }
            });
        } else if(data.type === 'point') {
            data.element.animate({
                x1: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                },
                x2: {
                    begin: seq * delays,
                    dur: durations,
                    from: data.x - 10,
                    to: data.x,
                    easing: 'easeOutQuart'
                },
                opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'easeOutQuart'
                }
            });
        } else if(data.type === 'grid') {
            // Using data.axis we get x or y which we can use to construct our animation definition objects
            var pos1Animation = {
                begin: seq * delays,
                dur: durations,
                from: data[data.axis.units.pos + '1'] - 30,
                to: data[data.axis.units.pos + '1'],
                easing: 'easeOutQuart'
            };

            var pos2Animation = {
                begin: seq * delays,
                dur: durations,
                from: data[data.axis.units.pos + '2'] - 100,
                to: data[data.axis.units.pos + '2'],
                easing: 'easeOutQuart'
            };

            var animations = {};
            animations[data.axis.units.pos + '1'] = pos1Animation;
            animations[data.axis.units.pos + '2'] = pos2Animation;
            animations['opacity'] = {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'easeOutQuart'
            };

            data.element.animate(animations);
        }
    });

// For the sake of the example we update the chart every time it's created with a delay of 10 seconds
    chart.on('created', function() {
        if(window.__exampleAnimateTimeout) {
            clearTimeout(window.__exampleAnimateTimeout);
            window.__exampleAnimateTimeout = null;
        }
        window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////// animation
}

$("#fillGraphDataID").click(function () {
    $("input[name='a1']").val(21);
    $("input[name='b1']").val(17);
    $("input[name='a2']").val(25);
    $("input[name='b2']").val(15);
    $("input[name='R1']").val(70);
    $("input[name='R2']").val(80);
    $("input[name='LR1']").val(30);
    $("input[name='LR2']").val(35);
    $("input[name='angleF']").val(45);
});

$("#saveGraphDataID").click(function () {
    var today = new Date();
    var date = today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    var fullTime = "-date" + date + "-time" + time;

    html2canvas(document.getElementsByClassName('ct-chart-line')).then(function(canvas) {
        canvas.toBlob(function(blob) {
            saveAs(blob, "graphEllipseRatio" + fullTime + ".png");
        });
    });

    var inputData = $("textarea").text();
    var text = new Blob([inputData], {type: "text/plain;charset=utf-8"});
    saveAs(text, "dataEllipseRatio" + fullTime + ".txt");

    sweetAlert("Saved", "to file", "success");
});

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
function inputDataToTxt() {
    $("textarea").append("(X; Y = K(X))\n" +
        "\na1 = " + a1 +
        "\nb1 = " + b1 +
        "\na2 = " + a2 +
        "\nb2 = " + b2 +
        "\nR1 = " + R1 +
        "\nR2 = " + R2 +
        "\nlr1 = " + lr1 +
        "\nlr2 = " + lr2 +
        "\nangle = " + angleF + "\n\n");
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

    inputDataToTxt();

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
    XR12.push(" ");
    XR12.push("a1/a2");
    XR12.push(" ");
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append("a1/a2 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});

$("input[value='b12']").click(function () {
    $("textarea").empty();
    readVarsDara();

    inputDataToTxt();

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
    XR12.push(" ");
    XR12.push("b1/b2");
    XR12.push(" ");
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append((j+1) + "-----------\n"+
                            "b1/b2 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});

$("input[value='ab1']").click(function () {
    $("textarea").empty();
    readVarsDara();

    inputDataToTxt();

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
    XR12.push(" ");
    XR12.push("a1/b1");
    XR12.push(" ");
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append((j+1) + "-----------\n"+
                            "a1/b1 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});

$("input[value='ab2']").click(function () {
    $("textarea").empty();
    readVarsDara();

    inputDataToTxt();

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
    XR12.push(" ");
    XR12.push("a2/b2");
    XR12.push(" ");
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append((j+1) + "-----------\n"+
                            "a2/b2 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});

$("input[value='lr12']").click(function () {
    $("textarea").empty();
    readVarsDara();

    inputDataToTxt();

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
    XR12.push(" ");
    XR12.push("lr1/lr2");
    XR12.push(" ");
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append((j+1) + "-----------\n"+
                            "lr1/lr2 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});

$("input[value='angle']").click(function () {
    $("textarea").empty();
    readVarsDara();

    inputDataToTxt();

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(calculateK()) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = calculateK();
        XR12[i] = (angleF).toFixed(0);
        angleF = angleF + 5;
    }
    XR12.push(" ");
    XR12.push("Angle");
    XR12.push(" ");
    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append((j+1) + "-----------\n"+
                            "angle = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});

