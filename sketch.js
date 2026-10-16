let q = [0, 0, 0, 1];
let status = 'starting';

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
  try {
    const sensor = new RelativeOrientationSensor({ frequency: 60 });
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

  // where the back of the phone points (x, y horizontal, z up)
  const vx = -2 * (x * z + y * w);
  const vy = -2 * (y * z - x * w);

  const horizontal = Math.hypot(vx, vy);
  const heading = (Math.atan2(vx, vy) * 180 / Math.PI + 360) % 360;

  const topUp = 2 * (y * z + x * w);
  const screenUp = 1 - 2 * (x * x + y * y);

  text('sensor: ' + status, 20, 60);
  text('heading: ' + heading.toFixed(0), 20, 120);
  text('how horizontal: ' + horizontal.toFixed(2), 20, 160);
  text('top up: ' + topUp.toFixed(2), 20, 220);
  text('screen up: ' + screenUp.toFixed(2), 20, 260);
}
