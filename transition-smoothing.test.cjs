const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

function run(reduced = false) {
  let top = -1188, now = 0, id = 0;
  const frames = new Map(), events = {}, values = {};
  const node = () => ({
    style: { setProperty(k, v) { values[k] = v; } },
    classList: { toggle() {}, contains() { return false; } }, setAttribute() {}, addEventListener() {},
  });
  const stage = Object.assign(node(), { offsetHeight: 1000 });
  const model = node(), follow = node(), landing = node();
  const intro = Object.assign(node(), {
    offsetHeight: 3500,
    getBoundingClientRect: () => ({ top, bottom: top + 3500 }),
    querySelector: s => s === '.abyss-stage' ? stage : s === '#abyss-model' ? model : follow,
  });
  vm.runInNewContext(readFileSync('dist/abyss.js', 'utf8'), {
    document: { hidden: false, documentElement: node(), addEventListener() {},
      querySelector: s => s === '.opening-video' ? null : s === '.abyss-intro' ? intro : landing, querySelectorAll: () => [] },
    matchMedia: q => ({ matches: q.includes('reduced-motion') ? reduced : true }),
    innerHeight: 1000,
    performance: { now: () => now },
    requestAnimationFrame: cb => { frames.set(++id, cb); return id; },
    cancelAnimationFrame: key => frames.delete(key),
    addEventListener: (name, cb) => { events[name] = cb; },
  });
  const tick = () => { now += 1000 / 60; const batch = [...frames.values()]; frames.clear(); batch.forEach(cb => cb(now)); };
  for (let i = 0; i < 120; i++) tick();
  let previous = Number(values['--landing-scale']);
  top = -1551; events.scroll();
  let largest = 0;
  for (let i = 0; i < 120; i++) {
    tick(); const current = Number(values['--landing-scale']);
    largest = Math.max(largest, Math.abs(current - previous)); previous = current;
  }
  if (!reduced) assert(largest < .06, `Zoom jumps ${(largest * 100).toFixed(1)}% in one frame (limit 6%)`);
  assert(previous > .97, 'Zoom must settle at its destination');
  assert.equal(frames.size, 0, 'Animation should stop when settled');
  console.log(`PASS ${reduced ? 'reduced motion' : 'scroll smoothing'}: max frame step ${(largest * 100).toFixed(2)}%`);
  top = -1188; events.scroll(); largest = 0;
  for (let i = 0; i < 120; i++) {
    tick(); const current = Number(values['--landing-scale']);
    largest = Math.max(largest, Math.abs(current - previous)); previous = current;
  }
  if (!reduced) assert(largest < .06, 'Reverse scrolling must also ease smoothly');
  assert.equal(frames.size, 0, 'Reverse animation should stop when settled');
  console.log(`PASS reverse scroll: max frame step ${(largest * 100).toFixed(2)}%`);
  for (const [position, expected] of [[.68,0],[.77,.5],[.85,1],[.95,1]]) {
    top=-2500*position; events.scroll();
    for(let i=0;i<150;i++)tick();
    assert(Math.abs(values['--text-reveal']-expected)<.01,'Copy must reveal gradually, then hold');
  }
  console.log('PASS extended text reveal and reading hold');
  for (const [position, fill] of [[.52,0],[.594,.5],[.66,1],[.69,1]]) {
    top=-2500*position; events.scroll();
    for(let i=0;i<150;i++)tick();
    assert.equal(values['--landing-scale'],1,'Second mask must never zoom');
    assert.equal(values['--text-reveal'],0,'Text must wait until after full image');
    assert(Math.abs(values['--materialize']-(reduced?1:fill))<.01,'Sketch should gradually become the full image');
  }
  console.log('PASS fixed-size sketch, progressive image fill, then text');
}
run(); run(true);
