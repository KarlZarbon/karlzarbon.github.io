
const canvasId = 'canvasID'
let canvas;
let canvasDiv
let canvasWidth

function setup()
{
    // get the width of the parent div element
    canvasDiv = document.getElementById(canvasId);
    canvasWidth = canvasDiv.offsetWidth;
    // and resize the p5 canvas accordingly
    canvas = createCanvas(canvasWidth/2, windowHeight/2);
    canvas.parent(canvasId);

    // canvas.position(canvasWidth/4, windowHeight/4);
}

function draw()
{
    background(204);
    strokeWeight(8);
    ellipse(width/2, height/2, width-8, height-8)
}

function windowResized() {
    // update div width
    canvasWidth = canvasDiv.offsetWidth;
    resizeCanvas(canvasWidth/2, windowHeight/2);
    // canvas.position(canvasWidth/4, windowHeight/4);
  }