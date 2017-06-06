window.onload = $("body").fadeIn(1000);

window.onload = function () {
    $("input[name='R1']").val(localStorage.getItem("circleLsR1"));
    $("input[name='R2']").val(localStorage.getItem("circleLsR2"));
    $("input[name='LR1']").val(localStorage.getItem("circleLsLR1"));
    $("input[name='LR2']").val(localStorage.getItem("circleLsLR2"));
    $("input[name='angle']").val(localStorage.getItem("circleLsAngle"));
};

// open info
$("#infoId").click(function () {
    window.open('zInfoCircle.html', '', "width=750,height=800");
});

//
function drawLineGraph(xArrays, yArrays) {
    $(".chartistCircleGraphClass").empty();
    $("#coordinateSystemCircleId").append("<b class='yAxi'> K</b>");
    var chart = new Chartist.Line('.chartistCircleGraphClass', {
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
    ///////////////////////////////////////////////////////////////////////////////////////////////////// animation
}


$("#fillGraphDataID").click(function () {
    $("input[name='R1']").val(21);
    $("input[name='R2']").val(27);
    $("input[name='LR1']").val(30);
    $("input[name='LR2']").val(33);
    $("input[name='angle']").val(30);
});

$("#saveGraphDataID").click(function () {
    var today = new Date();
    var date = today.getFullYear() + "." + (today.getMonth() + 1) + "." + today.getDate();
    var time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    var fullTime = "-date" + date + "-time" + time;

    // var svg = document.getElementById('coordinateSystemCircleId');
    // var canvas = document.createElement('canvas');
    // canvas.height = svg.getAttribute('height');
    // canvas.width = svg.getAttribute('width');
    // canvg(canvas, svg.parentNode.innerHTML.trim());
    // var dataURL = canvas.toDataURL('image/png');
    // var data = atob(dataURL.substring('data:image/png;base64,'.length)),
    //     asArray = new Uint8Array(data.length);
    //
    // for (var i = 0, len = data.length; i < len; ++i) {
    //     asArray[i] = data.charCodeAt(i);
    // }
    //
    // var blob = new Blob([asArray.buffer], {type: 'image/png'});
    // saveAs(blob, 'export_' + Date.now() + '.png');


    html2canvas(document.getElementsByClassName('ct-chart-line')).then(function(canvas) {
        canvas.toBlob(function(blob) {
            saveAs(blob, "graphCircleRatio" + fullTime + ".png");
        });
    });

    var inputData = $("textarea").text();
    var text = new Blob([inputData], {type: "text/plain;charset=utf-8"});
    saveAs(text, "dataCircleRatio" + fullTime + ".txt");

    sweetAlert("Saved", "to file", "success");
});

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

    $("textarea").append("(X = R1/R2; Y = K(R1/R2))\n" +
        "\nR1 = " + R1 +
        "\nR2 = " + R2 +
        "\nLR1 = " + LR1 +
        "\nLR2 = " + LR2 +
        "\nangle = " + angle + "\n\n");

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
    XR12.push(" ");
    XR12.push("R1/R2");
    XR12.push(" ");

    drawLineGraph(XR12, YKArray);

    for(var j = 0; j < XR12.length; j++){
        $("textarea").append((j+1) + "-----------\n"+
                             "R1/R2 = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
    // $("textarea").append();
});

$("input[value='LR12']").click(function () {
    $("textarea").empty();

    var R1 = parseInt($("input[name='R1']").val());
    var R2 = parseInt($("input[name='R2']").val());
    var LR1 = parseInt($("input[name='LR1']").val());
    var LR2 = parseInt($("input[name='LR2']").val());
    var angle = parseInt($("input[name='angle']").val());

    $("textarea").append("(X = R1/R2; Y = K(R1/R2))\n" +
        "\nR1 = " + R1 +
        "\nR2 = " + R2 +
        "\nLR1 = " + LR1 +
        "\nLR2 = " + LR2 +
        "\nangle = " + angle + "\n\n");

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
    XR12.push(" ");
    XR12.push("LR1/LR2");
    XR12.push(" ");
    drawLineGraph(XR12, YKArray);

    $("textarea").append("(X = LR1/LR2; Y = K(LR1/LR2))\n");
    for(var j = 0; j < XR12.length; j++){
        $("textarea").append((j+1) + "-----------\n"+
                             "LR1/LR2 = " + XR12[j] + "\n" +
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

    $("textarea").append("(X = R1/R2; Y = K(R1/R2))\n" +
        "\nR1 = " + R1 +
        "\nR2 = " + R2 +
        "\nLR1 = " + LR1 +
        "\nLR2 = " + LR2 +
        "\nangle = " + angle + "\n\n");

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
    XR12.push(" ");
    XR12.push("LR1/R1");
    XR12.push(" ");
    drawLineGraph(XR12, YKArray);

    $("textarea").append("(X = LR1/R1; Y = K(LR1/R1))\n");
    for(var j = 0; j < XR12.length; j++){
        $("textarea").append((j+1) + "-----------\n"+
                             "LR1/R1 = " + XR12[j] + "\n" +
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

    $("textarea").append("(X = R1/R2; Y = K(R1/R2))\n" +
        "\nR1 = " + R1 +
        "\nR2 = " + R2 +
        "\nLR1 = " + LR1 +
        "\nLR2 = " + LR2 +
        "\nangle = " + angle + "\n\n");

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
    XR12.push(" ");
    XR12.push("LR2/R2");
    XR12.push(" ");
    drawLineGraph(XR12, YKArray);

    $("textarea").append("(X = LR2/R2; Y = K(LR2/R2))\n");
    for(var j = 0; j < XR12.length; j++){
        $("textarea").append((j+1) + "-----------\n"+
                            "LR2/R2 = " + XR12[j] + "\n" +
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

    $("textarea").append("(X = R1/R2; Y = K(R1/R2))\n" +
        "\nR1 = " + R1 +
        "\nR2 = " + R2 +
        "\nLR1 = " + LR1 +
        "\nLR2 = " + LR2 +
        "\nangle = " + angle + "\n\n");

    var YKArray = [],
        XR12 = [];

    for (var i = 0; i < 10; i++) {
        if(isNaN(intersectingCircleCalc(R1, R2, LR1, LR2, angle)) == true){
            YKArray[i] = 0;
        }
        else YKArray[i] = intersectingCircleCalc(R1, R2, LR1, LR2, angle);
        XR12[i] = (angle).toFixed(0);
        angle = angle + 5;
    }
    XR12.push(" ");
    XR12.push("Angle");
    XR12.push(" ");
    drawLineGraph(XR12, YKArray);

    $("textarea").append("(X = angle; Y = K(angle))\n");
    for(var j = 0; j < XR12.length; j++){
        $("textarea").append((j+1) + "-----------\n"+
                            "angle = " + XR12[j] + "\n" +
                             "K = " + YKArray[j].toFixed(3) + "\n");
    }
});