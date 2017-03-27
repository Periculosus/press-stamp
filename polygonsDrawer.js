function Graph(config) {
    // user defined properties
    this.canvas = document.getElementById(config.canvasId);
    this.minX = config.minX;
    this.minY = config.minY;
    this.maxX = config.maxX;
    this.maxY = config.maxY;
    this.unitsPerTick = config.unitsPerTick;

    // constants
    this.axisColor = '#000000';
    this.font = '8pt Times New Roman';
    this.tickSize = 10;

    // relationships
    this.context = this.canvas.getContext('2d');
    this.rangeX = this.maxX - this.minX;
    this.rangeY = this.maxY - this.minY;
    this.unitX = this.canvas.width / this.rangeX;
    this.unitY = this.canvas.height / this.rangeY;
    this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
    this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
    this.iteration = (this.maxX - this.minX) / 1000;
    this.scaleX = this.canvas.width / this.rangeX;
    this.scaleY = this.canvas.height / this.rangeY;

    // draw x and y axis
    this.drawXAxis();
    this.drawYAxis();
}

Graph.prototype.drawXAxis = function () {
    var context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(0, this.centerY);
    context.lineTo(this.canvas.width, this.centerY);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();

    // draw tick marks
    var xPosIncrement = this.unitsPerTick * this.unitX;
    var xPos, unit;
    context.font = this.font;
    context.textAlign = 'center';
    context.textBaseline = 'top';

    // draw left tick marks
    xPos = this.centerX - xPosIncrement;
    unit = -1 * this.unitsPerTick;
    while (xPos > 0) {
        context.moveTo(xPos, this.centerY - this.tickSize / 2);
        context.lineTo(xPos, this.centerY + this.tickSize / 2);
        context.stroke();
        context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
        unit -= this.unitsPerTick;
        xPos = Math.round(xPos - xPosIncrement);
    }

    // draw right tick marks
    xPos = this.centerX + xPosIncrement;
    unit = this.unitsPerTick;
    while (xPos < this.canvas.width) {
        context.moveTo(xPos, this.centerY - this.tickSize / 2);
        context.lineTo(xPos, this.centerY + this.tickSize / 2);
        context.stroke();
        context.fillText(unit, xPos, this.centerY + this.tickSize / 2 + 3);
        unit += this.unitsPerTick;
        xPos = Math.round(xPos + xPosIncrement);
    }
    context.restore();
};

Graph.prototype.drawYAxis = function () {
    var context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(this.centerX, 0);
    context.lineTo(this.centerX, this.canvas.height);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();

    // draw tick marks
    var yPosIncrement = this.unitsPerTick * this.unitY;
    var yPos, unit;
    context.font = this.font;
    context.textAlign = 'right';
    context.textBaseline = 'middle';

    // draw top tick marks
    yPos = this.centerY - yPosIncrement;
    unit = this.unitsPerTick;
    while (yPos > 0) {
        context.moveTo(this.centerX - this.tickSize / 2, yPos);
        context.lineTo(this.centerX + this.tickSize / 2, yPos);
        context.stroke();
        context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
        unit += this.unitsPerTick;
        yPos = Math.round(yPos - yPosIncrement);
    }

    // draw bottom tick marks
    yPos = this.centerY + yPosIncrement;
    unit = -1 * this.unitsPerTick;
    while (yPos < this.canvas.height) {
        context.moveTo(this.centerX - this.tickSize / 2, yPos);
        context.lineTo(this.centerX + this.tickSize / 2, yPos);
        context.stroke();
        context.fillText(unit, this.centerX - this.tickSize / 2 - 3, yPos);
        unit -= this.unitsPerTick;
        yPos = Math.round(yPos + yPosIncrement);
    }
    context.restore();
};

Graph.prototype.transformContext = function () {
    var context = this.context;
    // move context to center of canvas
    this.context.translate(this.centerX, this.centerY);
    /*
     * stretch grid to fit the canvas window, and
     * invert the y scale so that that increments
     * as you move upwards
     */
    context.scale(this.scaleX, -this.scaleY);
};

//function for drawing mathematics functions
Graph.prototype.drawEquation = function (equation, color, thickness) {
    var context = this.context;
    context.save();
    context.save();
    this.transformContext();
    context.beginPath();

    context.moveTo(this.minX, equation(this.minX));
    for (var x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
        context.lineTo(x, equation(x));
    }

    context.restore();
    context.lineJoin = 'round';
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.stroke();
    context.restore();
};
///////////////////////////////////////////////////////////////////////////////////

// function for drawing ellipses
Graph.prototype.drawEllipse = function (equation, x, y, a, b, angle, lineColor, lineThickness, fillColor, opacity) {
    var context = this.context;
    context.save();
    context.save();
    this.transformContext();
    context.beginPath();

    //default data
    fillColor = fillColor || "#ffffff";
    opacity = opacity || 0;
    //////////////
    context.ellipse(x, y, a, b, angle * Math.PI / 180, 0, 2 * Math.PI);
    context.fillRect(x, y, 0.8, 0.8);

    context.restore();
    context.lineJoin = 'round';
    context.lineWidth = lineThickness;
    context.strokeStyle = lineColor;
    context.stroke();
    context.globalAlpha = opacity;
    context.fillStyle = fillColor;
    context.fill();
    context.restore();
};
///////////////////////////////////////////////////////////////////////////////////////

// function for drawing circles
Graph.prototype.drawCircle = function (equation, x, y, radius, color, thickness, fillColor, opacity) {
    var context = this.context;
    context.save();
    context.save();
    this.transformContext();
    context.beginPath();

    //default data
    fillColor = fillColor || "#ffffff";
    opacity = opacity || 0;
    //////////////
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillRect(x, y, 0.7, 0.7);

    context.restore();
    context.lineJoin = 'round';
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.stroke();
    context.globalAlpha = opacity;
    context.fillStyle = fillColor;
    context.fill();
    context.restore();
};
///////////////////////////////////////////////////////////////////////////////////////

// function to draw polygons
Graph.prototype.drawPolygons = function (equation, polygon, contourColor, fillColor, thickness) {
    var context = this.context;
    context.save();
    context.save();
    this.transformContext();
    context.beginPath();

    context.moveTo(polygon[0][0], polygon[0][1]);
    for (var i = 1; i < polygon.length; i++)
        context.lineTo(polygon[i][0], polygon[i][1]);
    context.lineTo(polygon[0][0], polygon[0][1]);

    context.restore();
    context.lineJoin = 'round';
    context.strokeStyle = contourColor;
    context.fillStyle = fillColor;
    context.lineWidth = thickness;
    context.fill();
    context.stroke();
    context.restore();
    context.closePath();
};
///////////////////////////////////////////////////////////////////////////////////////

//function for drawing line
Graph.prototype.drawLine = function (equation, xBegin, yBegin, xEnd, yEnd, color, thickness) {
    var context = this.context;
    context.save();
    context.save();
    this.transformContext();
    context.beginPath();

    context.moveTo(xBegin, yBegin);
    context.lineTo(xEnd, yEnd);

    context.restore();
    context.lineJoin = 'round';
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.stroke();
    context.restore();
};
///////////////////////////////////////////////////////////////////////////////////////

// function for drawing coordinates with text
Graph.prototype.drawCoordinate = function (equation, xCoordinate, yCoordinate, dotWidth, dotLength) {
    var context = this.context;
    context.save();
    context.save();
    this.transformContext();
    context.beginPath();

    dotWidth = dotWidth || 3;
    dotLength = dotLength || 3;
    context.fillRect(xCoordinate, yCoordinate, dotWidth, dotLength);
    // context.scale(1,-1);
    // context.fillText(simpleText, xCoordinate+2, yCoordinate+2);

    context.restore();
    context.lineJoin = 'round';
    context.restore();
};
///////////////////////////////////////////////////////////////////////////////////////

// function for clear canvas //and reDraw coordinate system
Graph.prototype.clearCanvas = function () {
    var context = this.context;
    var canvas = this.canvas;
    context.clearRect(0, 0, canvas.width, canvas.height);
    // this.drawXAxis();
    // this.drawYAxis();
};
///////////////////////////////////////////////////////////////////////////////////////

var myGraph = new Graph({
    canvasId: 'coordinateSystemId',
    minX: -100,
    minY: -100,
    maxX: 100,
    maxY: 100,
    unitsPerTick: 10
});

/*
 myGraph.drawEquation(function(x) {
 return 5 * Math.sin(x);
 }, 'green', 3);

 myGraph.drawEquation(function(x) {
 return x * x;
 }, 'blue', 3);

 myGraph.drawEquation(function(x) {
 return 1 * x;
 }, 'red', 3);
 */