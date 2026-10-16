let rx = 0, ry = 0, rz = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
  window.addEventListener('devicemotion', (e) => {
    const r = e.rotationRate;
    if (r) {
      rx = r.alpha || 0;
      ry = r.beta || 0;
      rz = r.gamma || 0;
    }
  });
}

function draw() {
  background(30);
  fill(255);
  const total = abs(rx) + abs(ry) + abs(rz);
  text('rate alpha: ' + rx.toFixed(1), 20, 60);
  text('rate beta: ' + ry.toFixed(1), 20, 100);
  text('rate gamma: ' + rz.toFixed(1), 20, 140);
  text('total movement: ' + total.toFixed(1), 20, 200);
}
