let img;
let i = 0;
let j = 0;
let w = 20;

let canvasLocation = document.getElementById("right");

let iMax = 0;
let jMax = 0;
function preload() {
  img = loadImage('tiger-woods-2001-masters-18th-hole-ross-wood.jpg');
}

function setup() {
  var myCanvas = createCanvas(img.width,img.height);
  myCanvas.parent("right")
  setInterval(populateImg, 100); //Frequency to Populate Grid
  
}

function populateImg(){
  for(var i = 0; i < iMax; i+=w){
    for(var j = 0; j < jMax; j+=w){
      let rand = random(10);
      if(rand > 8){
        image(img, i, j, w-0.5, w-0.5, i, j, w-0.5, w-0.5);
      }
    } 
  }
  iMax += w;
  jMax += w;
}