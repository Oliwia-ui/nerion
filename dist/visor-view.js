(() => {
  const visor = document.querySelector('.visor-dialog');
  if (!visor) return;
  const ocean = visor.querySelector('.visor-ocean');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  visor.setAttribute('aria-label', 'Inside the Nerion mask — illustrative dive display');
  visor.querySelector('.visor-grid').remove();
  visor.querySelector('.visor-reticle').remove();
  visor.querySelector('.visor-signal').remove();
  visor.querySelector('.visor-compass').innerHTML = 'E &nbsp; · &nbsp; 120 &nbsp; · &nbsp; <b>142° SE</b> &nbsp; · &nbsp; 160 &nbsp; · &nbsp; S';
  visor.querySelector('.visor-depth .micro:last-child').textContent = 'METRES';
  // Keep these original elements for the existing depth slider's listeners.
  visor.querySelector('.visor-stats').innerHTML = '<div>WATER TEMP<b id="visor-temp">18.4°C</b></div><div hidden>VISIBILITY<b id="visor-visibility">18.0 M</b></div><div>DIVE TIME<b>24 <small>MIN</small></b></div><div>BATTERY<b>▰ ▰ ▰ ▱</b></div>';
  visor.querySelector('.visor-bottom p').textContent = 'ILLUSTRATIVE VIEW · SIMULATED DATA · NOT FOR DIVE PLANNING';
  const guidance = document.createElement('p');
  guidance.className = 'visor-look micro';
  guidance.textContent = 'MOVE YOUR POINTER TO LOOK AROUND';
  visor.append(guidance);
  const nose = document.createElement('div');
  nose.className = 'visor-nose'; nose.setAttribute('aria-hidden', 'true'); visor.append(nose);

  // Transform only the oversized ocean plane; the optical display stays lens-fixed.
  let frame = 0, x = 0, y = 0;
  function paint() {
    frame = 0;
    ocean.style.setProperty('--look-x', `${x * -42}px`);
    ocean.style.setProperty('--look-y', `${y * -28}px`);
  }
  function recenter() { x = 0; y = 0; cancelAnimationFrame(frame); paint(); }
  visor.addEventListener('pointermove', event => {
    if (!visor.open || reduced.matches || event.pointerType === 'touch') return;
    const rect = visor.getBoundingClientRect();
    x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    if (!frame) frame = requestAnimationFrame(paint);
  });
  visor.addEventListener('pointerleave', recenter);
  visor.addEventListener('close', recenter);
  reduced.addEventListener('change', recenter);

  const controls = document.querySelector('.product-controls');
  const entry = document.createElement('button');
  entry.type = 'button'; entry.textContent = 'Enter visor ↗';
  let fromProduct = false;
  entry.addEventListener('click', () => {
    fromProduct = true;
    document.querySelector('.magic-visor').click();
  });
  controls.append(entry);
  visor.addEventListener('close', () => {
    if (fromProduct) { entry.focus({preventScroll:true}); fromProduct = false; }
  });
})();
