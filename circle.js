$("#drawCircleGraphID").click(function () {
    window.open('circleGraph.html', '', "width=710,height=550");
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


/*
 K_d:=sqrt(sqr(K_p1)+sqr(K_p2)-2*K_p1*K_p2*cos(K_fi*pi/180));
 K_w1:=K_p1/K_r1;
 K_w2:=K_p2/K_r2;
 K_w:=K_r2/K_r1;
 K_cos_alpha:=(sqr(K_r2)-sqr(K_r1)-sqr(K_d))/(-2*K_r1*K_d);
 K_cos_beta:=(sqr(K_r1)-sqr(K_r2)-sqr(K_d))/(-2*K_r2*K_d);
 K_alpha:=arccos(K_cos_alpha)*180/pi;
 K_beta:=arccos(K_cos_beta)*180/pi;
 K_sin_alpha:=sin(K_alpha*pi/180);
 K_A:=K_sin_alpha;
 K_K:=(K_alpha*(pi/180)-0.5*sin(2*K_alpha*(pi/180))+sqr(K_w)*(K_beta*(pi/180)-0.5*sin(2*K_beta*(pi/180))))/pi;
 K_S_per:=K_K*pi*sqr(K_r1);

 K_p1 - это у вас lr1
 K_p2 - это у вас lr2
 K_r1 - это у вас а1=b1
 K_r2 - это у вас а2=b2
 K_S_per - площадь пересечения
 K_K - коэффициент пересеения
 */

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

    $("#outputDataID").append("<b>Площадь перекрытия S  = </b>" + K_S_per.toFixed(5) + " см<sup>2</sup>" +
                          "<br><b>Коэффициент перекрытия K = </b>" + K_K.toFixed(5) + " см<sup>2</sup>");

});