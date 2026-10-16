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
  text('alpha: ' + alpha.toFixed(0), 20, 60);
  text('beta: ' + beta.toFixed(0), 20, 100);
  text('gamma: ' + gamma.toFixed(0), 20, 140);
}
