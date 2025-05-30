function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

const canvas = document.getElementById('binary-canvas');
const ctx = canvas.getContext('2d');
let raf;

const canvasSize = 400;
ctx.canvas.width  = canvasSize;
ctx.canvas.height = canvasSize;


ctx.font = '20px Arial';
ctx.fillStyle = '#444444';



const fontSize = 20;
const columns = Math.floor(canvas.width / fontSize);
const rows = Math.floor(canvas.height / fontSize);

const binChars = ['0', '1'];
const bits = [];
const bitHeight = fontSize;
const bitWidth = fontSize;

for(let r = 0; r < rows; r++) {
  for(let c = 0; c < columns; c++) {
    bits.push({
      x: c * bitWidth,
      y: r * bitHeight,
      value: binChars[Math.floor(Math.random() * binChars.length)],
      hasDrawn: false
    });
  }
}

const fps = 1;
const interval = 1000/fps;
let now;
let then = Date.now();
let delta;

for(let bit of bits) {
  ctx.clearRect(bit.x, bit.y, bitWidth, bitHeight);
  ctx.fillText(bit.value, bit.x, bit.y + bitHeight);
  bit.hasDrawn = true;
}

function draw() {
  raf = window.requestAnimationFrame(draw);
  now = Date.now();
  delta = now - then;

  if (delta > interval) {
    for(let bit of bits) {
      if(bit.hasDrawn === true && (Math.random() * 100) > 95) { 
        let newVal = (bit.value === binChars[1]) ? binChars[0] : binChars[1];

        ctx.clearRect(bit.x, bit.y, bitWidth, bitHeight);
        ctx.fillText(newVal, bit.x, bit.y + bitHeight);
        bit.value = newVal;
      }
    }
    then = now - (delta % interval);
  }
}
draw();
  