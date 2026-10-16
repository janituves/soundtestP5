let alpha = 0, beta = 0, gamma = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
  window.addEventListener('deviceorientation', (e) => {
    alpha = e.alpha || 0;
    beta = e.beta || 0;
    gamma = e.gamma || 0;
  });
}

function draw() {
  background(30);
  fill(255);
  const b = beta * Math.PI / 180;
  const g = gamma * Math.PI / 180;
  const topUp = Math.sin(b);
  const screenUp = Math.cos(b) * Math.cos(g);
  text('raw beta: ' + beta.toFixed(0), 20, 60);
  text('raw gamma: ' + gamma.toFixed(0), 20, 100);
  text('top up: ' + topUp.toFixed(2), 20, 180);
  text('screen up: ' + screenUp.toFixed(2), 20, 220);
}
