(() => {
  const stage = document.querySelector('#abyss .abyss-stage');
  if (!stage) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const intro = document.createElement('div');
  intro.className = 'opening-cipher';
  intro.innerHTML = '<p class="cipher-eyebrow">INTELLIGENCE BELOW THE SURFACE</p><div class="cipher-word" aria-label="Nerion"><span aria-hidden="true">NERION</span></div><p class="cipher-invitation">SCROLL TO ENTER THE BLUE <span>↓</span></p>';
  stage.append(intro);
  const letters = intro.querySelector('.cipher-word span');
  const name = 'NERION', glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>+';
  let timer = 0, started = 0, active = false;
  function tick() {
    const phase = (performance.now() - started) % 4400;
    // Decode left to right, hold the word, then dissolve back into a cipher.
    const resolved = phase < 1600 ? Math.floor(phase / 230) : phase < 3300 ? 6 : Math.max(0, 6 - Math.floor((phase - 3300) / 140));
    letters.textContent = [...name].map((letter, i) => i < resolved ? letter : glyphs[Math.floor(Math.random() * glyphs.length)]).join('');
    timer = setTimeout(tick, 95);
  }
  function sync() {
    const atTop = scrollY <= 4;
    intro.classList.toggle('is-dismissed', !atTop);
    intro.setAttribute('aria-hidden', String(!atTop));
    const shouldRun = atTop && !document.hidden && !reduced.matches;
    if (shouldRun === active) return;
    active = shouldRun;
    clearTimeout(timer);
    if (active) { started = performance.now(); tick(); }
    else letters.textContent = name;
  }
  addEventListener('scroll', sync, {passive:true});
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  sync();
})();
