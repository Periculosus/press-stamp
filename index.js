$('#idCircleCalc').click(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.open('circle.html', '', "width=530");
    }
    else window.open('circle.html', '', "width=1060,height=800");
});

$('#idEllipseCalc').click(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.open('ellipse.html', '', "width=530");
    }
    else window.open('ellipse.html', '', "width=1005,height=800");

});

$('#idPolygonsCalc').click(function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.open('polygons.html', '', "width=530");
    }
    else window.open('polygons.html', '', "width=980,height=730");

});

$('#infoID').click(function () {

});


$("#tip1").tipsy({
    gravity: 'e',
    fade: true,
    fontSize: "14px"
});
$("#tip2").tipsy({
    gravity: 'ne',
    fade: true
});
$("#tip3").tipsy({
    gravity: 'sw',
    fade: true
});
$("#tip4").tipsy({
    gravity: 'w',
    fade: true
});
$("#tip5").tipsy({
    gravity: 'w',
    fade: true
});
$("#tip6").tipsy({
    gravity: 'ne',
    fade: true
});
$("#tip7").tipsy({
    gravity: 'se',
    fade: true
});
$("#tip8").tipsy({
    gravity: 'se',
    fade: true
});
$("#tip9").tipsy({
    gravity: 'nw',
    fade: true
});
$("#tip10").tipsy({
    gravity: 'nw',
    fade: true
});

