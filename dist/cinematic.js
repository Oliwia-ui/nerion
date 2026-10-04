(() => {
  if(document.documentElement.classList.contains('film-journey'))return;
  const section = document.querySelector('.descent-world');
  const viewport = section.querySelector('.world-viewport');
  const model = document.querySelector('#descent-model');
  const deep = document.querySelector('.deep');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = value => Math.max(0, Math.min(1, value));
  let queued = false;
  let lastOrbit = '';
  let lastProgress = -1;
  const depthLabel = document.querySelector('#world-depth');
  function update() {
    queued = false;
    const rect = section.getBoundingClientRect();
    const deepRect = deep.getBoundingClientRect();
    const deepHeight = deep.offsetHeight;
    const progress = reduced ? .35 : clamp(-rect.top / Math.max(1, section.offsetHeight - viewport.offsetHeight));
    if (Math.abs(progress-lastProgress)>.0005) {
    lastProgress=progress;
    viewport.style.setProperty('--journey', progress);
    viewport.style.setProperty('--ocean-scale', 1.05 + progress*.22);
    viewport.style.setProperty('--title-opacity', Math.max(.08, .85 - progress*1.2));
    viewport.style.setProperty('--title-shift', `${-progress*90}px`);
    viewport.style.setProperty('--object-y', `${25-progress*60}px`);
    viewport.style.setProperty('--object-scale', .86+progress*.24);
    viewport.style.setProperty('--guide-opacity', .14+Math.sin(progress*Math.PI)*.25);
    viewport.style.setProperty('--story-opacity', clamp(.25+progress*1.5));
    viewport.style.setProperty('--story-y', `${20-progress*20}px`);
    const depthText=(5+progress*10).toFixed(1).padStart(4,'0');
    if(depthLabel.textContent!==depthText)depthLabel.textContent=depthText;
    const orbit = `${(180-progress*100).toFixed(1)}deg ${(80-progress*12).toFixed(1)}deg 105%`;
    if (orbit !== lastOrbit) {model.setAttribute('camera-orbit', orbit);lastOrbit=orbit;}
    }
    if (!reduced && deepRect.top < innerHeight && deepRect.bottom > 0) {
      const deepProgress = clamp((innerHeight-deepRect.top)/(innerHeight+deepHeight));
      deep.style.setProperty('--deep-zoom', 1.05+deepProgress*.09);
      deep.style.setProperty('--deep-drift', `${-deepProgress*30}px`);
    }
  }
  function queue() {if (!queued) {queued=true;requestAnimationFrame(update);}}
  addEventListener('scroll', queue, {passive:true});
  addEventListener('resize', queue);
  model.addEventListener('load', queue);
  update();
  const copy = {
    optic: ['01 / ADAPTIVE OPTIC', 'Clarity in the unknown.', 'A wide, uninterrupted view. Nerion’s adaptive optic concept brings the ocean closer, with essential information quietly inside the visor.'],
    presence: ['02 / DESIGNED FOR PRESENCE', 'Stay with the moment.', 'Depth, direction and environmental awareness in one connected perspective. Less looking away. More of the world you came to discover.']
  };
  const panel = document.querySelector('#world-detail');
  const buttons = [...document.querySelectorAll('[data-world-detail]')];
  let active = null;
  function close() {panel.hidden=true;active=null;buttons.forEach(b=>b.setAttribute('aria-expanded','false'));}
  buttons.forEach(button => button.addEventListener('click', () => {
    const key=button.dataset.worldDetail;
    if (active===key) {close();return;}
    active=key;const detail=copy[key];
    panel.querySelector('#world-detail-label').textContent=detail[0];
    panel.querySelector('h3').textContent=detail[1];panel.querySelector('p').textContent=detail[2];
    panel.hidden=false;buttons.forEach(b=>b.setAttribute('aria-expanded',String(b===button)));
  }));
  panel.querySelector('button').addEventListener('click',()=>{const trigger=buttons.find(b=>b.dataset.worldDetail===active);close();trigger?.focus({preventScroll:true});});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!panel.hidden){const trigger=buttons.find(b=>b.dataset.worldDetail===active);close();trigger?.focus({preventScroll:true});}});
})();
