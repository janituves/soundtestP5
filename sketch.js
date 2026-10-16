let lastT = 0;
let dt = 0;
let ctx = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(24);
  window.addEventListener('devicemotion', () => {
    const now = performance.now();
    dt = now - lastT;
    lastT = now;
  });
}

function startAudio() {
  if (ctx) return;
  ctx = new AudioContext();
  ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
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
  text('ms between sensor events: ' + dt.toFixed(1), 20, 60);
  if (!ctx) {
    text('tap the screen to start audio', 20, 120);
  } else {
    const base = ctx.baseLatency ? ctx.baseLatency * 1000 : 0;
    const out = ctx.outputLatency ? ctx.outputLatency * 1000 : 0;
    text('base latency ms: ' + base.toFixed(1), 20, 120);
    text('output latency ms: ' + out.toFixed(1), 20, 160);
    text('sample rate: ' + ctx.sampleRate, 20, 200);
    text('audio state: ' + ctx.state, 20, 240);
  }
}