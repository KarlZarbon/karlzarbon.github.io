const canvasId = 'canvasID'
let canvas;
let canvasDiv
let canvasWidth
let ratio = 1.0

function setup()
{
    // get the width of the parent div element
    canvasDiv = document.getElementById(canvasId);
    canvasWidth = canvasDiv.offsetWidth;


    canvas = createCanvas(560, 590);
    canvas.parent(canvasId);
    let inp = createInput('Love!');
    inp.parent("inputID");
    inp.size(200);
    inp.input(myInputEvent);
  
    checkbox = createCheckbox(' wrap message', false);
    checkbox.parent("inputID");
    checkbox.changed(myCheckedEvent);
  
    background(color('#cd120a'));
    textFont('Azeret Mono');
    textSize(14)
  
    fill(255)
    generator = new LoveGenerator(inp.value())
    generator.generate()

    // Create a button
    button = createButton('Save');
    button.parent("inputID");
    
    button.mousePressed(saveImage);

}



function saveImage(){
    saveCanvas(canvas, 'love-generator', 'jpg')
  }

function myInputEvent() {

    generator.initMsg(this.value())
    generator.generate()
  }
  
  function myCheckedEvent() {
    generator.setWrap(this.checked())
    generator.init()
    generator.generate()
  }


function draw()
{
    background(color('#cd120a'));
    let displayMsg = generator.getMessage()
  
    let endIdx = Math.floor(displayMsg.length / MAXLENGTH)
    for (let i = 0; i < endIdx; i++) {
  
      let sliceText = displayMsg.slice(i * MAXLENGTH, i * MAXLENGTH + MAXLENGTH)
      text(sliceText, 10, 20 + i * 16)
    }
  
}

  
// 'LOVE' spacing information
let data = [60,1,12,26,9,12,3,8,24,17,8,4,6,23,21,6,4,6,22,12,5,6,5,
    4,6,21,11,8,6,4,4,6,21,10,10,5,4,4,6,21,9,11,5,4,
    4,6,21,8,11,6,4,4,6,21,7,11,7,4,4,6,21,6,11,8,4,
    4,6,19,1,1,5,11,9,4,4,6,19,1,1,5,10,10,4,4,6,18,2,1,6,8,11,4,
    4,6,17,3,1,7,5,13,4,4,6,15,5,2,23,5,1,29,5,17,8,
    1,29,9,9,12,1,13,5,40,1,1,13,5,40,1,4,6,13,3,10,6,12,5,1,
    5,6,11,3,11,6,14,3,1,5,6,11,3,11,6,15,2,1,
    6,6,9,3,12,6,16,1,1,6,6,9,3,12,6,7,1,10,
    7,6,7,3,13,6,6,2,10,7,6,7,3,13,14,10,8,6,5,3,14,6,6,2,10,
    8,6,5,3,14,6,7,1,10,9,6,3,3,15,6,16,1,1,
    9,6,3,3,15,6,15,2,1,10,6,1,3,16,6,14,3,1,10,10,16,6,12,5,1,
    11,8,13,27,1,11,8,13,27,1,60]
    
    
    const MAXLENGTH = 60
    const MAXHEIGHT = 37
    
    // Construct a string by repeating the input message and encoding the 'LOVE' artwork
    class LoveGenerator {
    
        constructor(msg) {
            this.initMsg(msg)
            // wrap the input text or always start from the beginning
            this.wrap = false
        }
    
        init() {
    
            this.charNumber;  // current position in a line
            this.printMessage = true; // print text or space
            this.lineNumber = 0;
            this.dataIdx = 0;
            this.msgIndex = 0;
    
            this.result = ""
            this.newline = true; // used to initialize variable for a new line
        }
    
        initMsg(msg) {
            this.init()
    
            this.msg = msg;
            this.msgLength = msg.length;
    
            // repeat and store input message
            if (this.msgLength > 0) {
                this.textArray = []
                let floorL = Math.floor(MAXLENGTH / this.msgLength)
    
                for (let j = 0; j <= floorL; j++) {
                    for (let i = 1; i <= this.msgLength; i++) {
                        this.textArray[j * this.msgLength + i - 1] = this.msg[i - 1]
                    }
                }
            }
        }
    
        setWrap(value) {
            this.wrap = value
        }
    
        generate() {
            while (this.lineNumber < MAXHEIGHT) {
                if (this.newline) {
                    this.initNewline();
                }
                else {
                    this.generateLine();
                }
            }
        }
    
        getMessage() {
            return this.result
        }
    
    
        initNewline() {
    
            this.charNumber = 1;
            this.printMessage = true;
            this.lineNumber++;
            this.newline = false
        }
    
        generateLine() {
    
            let a;
            a = data[this.dataIdx++];
            this.charNumber += a;
            if (this.printMessage == true) {
                this.addMsgText(a);
            }
            else {
                this.addSpace(a);
            }
            if (this.charNumber > MAXLENGTH) {
                this.newline = true
            }
        }
    
    
        addMsgText(a) {
            for (let i = this.charNumber - a; i <= this.charNumber - 1; i++) {
                if (!this.wrap) {
                    this.result += this.textArray[i - 1];
    
                }
                else {
                    this.result += this.msg[(this.msgIndex++) % this.msgLength];
                }
            }
            this.printMessage = false
        }
    
    
        addSpace(a) {
    
            for (let i = 0; i < a; i++) {
                this.result += ' ';
            }
            this.printMessage = true;
    
        }
    }