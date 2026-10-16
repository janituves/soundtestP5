let alpha = 0, beta = 0, gamma = 0;
let absolute = false;

function setAngles(e) {
  alpha = e.alpha || 0;
  beta = e.beta || 0;
  gamma = e.gamma || 0;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
   window.addEventListener('deviceorientationabsolute', (e) => {
    if (e.alpha !== null) {
      absolute = true;
      setAngles(e);
    }
  });
  window.addEventListener('deviceorientation', (e) => {
    if (!absolute) setAngles(e);
  });
}

function draw() {
  background(30);
  fill(255);
  const r = Math.PI / 180;
  const sa = Math.sin(alpha * r), ca = Math.cos(alpha * r);
  const sb = Math.sin(beta * r), cb = Math.cos(beta * r);
  const sg = Math.sin(gamma * r), cg = Math.cos(gamma * r);

  // where the back of the phone points: east, north, up
  const vx = -(ca * sg + sa * sb * cg);
  const vy = -(sa * sg - ca * sb * cg);
  const vz = -(cb * cg);

  const horizontal = Math.hypot(vx, vy);
  const heading = (Math.atan2(vx, vy) / r + 360) % 360;

  text('compass-based: ' + absolute, 20, 60);
  text('heading: ' + heading.toFixed(0), 20, 120);
  text('how horizontal: ' + horizontal.toFixed(2), 20, 160);
  text('raw alpha: ' + alpha.toFixed(0), 20, 220);
}
