let ctx = null;
let events = 0;
let lastT = 0;
let dt = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
  window.addEventListener('devicemotion', () => {
    const now = performance.now();
    dt = now - lastT;
    lastT = now;
    events++;
  });
}

function startAudio() {
  if (ctx) return;
  ctx = new AudioContext();
  ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.frequency.value = 440;
  gain.gain.value = 0.1;
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.5);
}

function touchEnded() { startAudio(); return false; }
function mouseReleased() { startAudio(); }

function draw() {
  background(30);
  fill(255);
  text('motion events: ' + events, 20, 60);
  text('ms between events: ' + dt.toFixed(1), 20, 100);
  if (!ctx) {
    text('tap the screen to start audio', 20, 160);
  } else {
    text('audio state: ' + ctx.state, 20, 160);
  }
}
