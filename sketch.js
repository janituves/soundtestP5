let q = [0, 0, 0, 1];
let status = 'starting';

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
  try {
    const sensor = new AbsoluteOrientationSensor({ frequency: 60 });
    sensor.addEventListener('reading', () => {
      q = sensor.quaternion;
      status = 'running';
    });
    sensor.addEventListener('error', (e) => {
      status = 'error: ' + e.error.name;
    });
    sensor.start();
  } catch (e) {
    status = 'failed: ' + e.name;
  }
}

function draw() {
  background(30);
  fill(255);
  const [x, y, z, w] = q;
  const topUp = 2 * (y * z + x * w);
  const screenUp = 1 - 2 * (x * x + y * y);
  text('sensor: ' + status, 20, 60);
  text('top up: ' + topUp.toFixed(2), 20, 120);
  text('screen up: ' + screenUp.toFixed(2), 20, 160);
}
