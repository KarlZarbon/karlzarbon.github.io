
const canvasId = 'canvasID'
let canvas;
let canvasDiv
let canvasWidth
let ratio = 0.75

function setup()
{
    // get the width of the parent div element
    canvasDiv = document.getElementById(canvasId);
    canvasWidth = canvasDiv.offsetWidth;

    // and resize the p5 canvas accordingly
    canvas = createCanvas(canvasWidth, ratio * canvasWidth);
    canvas.parent(canvasId);

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
    resizeCanvas(canvasWidth, ratio * canvasWidth);
  }