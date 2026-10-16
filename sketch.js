function draw() {
  background(30);
  fill(255);
  const [x, y, z, w] = q;

  // where the back of the phone points (x, y horizontal, z up)
  const vx = -2 * (x * z + y * w);
  const vy = -2 * (y * z - x * w);

  const horizontal = Math.hypot(vx, vy);
  const heading = (Math.atan2(vx, vy) * 180 / Math.PI + 360) % 360;

  text('sensor: ' + status, 20, 60);
  text('heading: ' + heading.toFixed(0), 20, 120);
  text('how horizontal: ' + horizontal.toFixed(2), 20, 160);
}
