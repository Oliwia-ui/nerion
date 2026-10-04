// An exploded visual study built from the original Nerion product render.
// Every piece shares the same image coordinates, so it reassembles without seams.
(() => {
  if(document.documentElement.classList.contains('skip-surface'))return;
  const hero = document.querySelector('.hero');
  const art = hero.querySelector('.hero-art');
  const still = art.querySelector('img');
  art.setAttribute('role', 'img');
  art.setAttribute('aria-label', 'Nerion mask with an interactive exploded component view');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 1000 558');
  svg.setAttribute('aria-hidden', 'true');
  svg.classList.add('mask-hologram');
  const lens = 'M 520 199 Q 580 160 655 174 Q 723 149 782 188 L 775 275 Q 758 327 705 344 L 674 316 L 650 248 Q 639 229 624 256 L 597 319 Q 550 337 518 298 Q 494 255 520 199 Z';
  const lower = 'M 575 336 L 612 321 L 640 265 L 670 325 L 708 350 L 785 330 L 797 376 L 758 443 L 688 474 L 579 440 L 557 397 Z';
  const strap = 'M 767 121 L 932 115 L 953 475 L 830 518 L 779 480 L 836 401 L 820 332 L 899 302 L 909 169 L 804 157 Z';
  const sensor = 'M 789 208 L 843 214 L 840 271 L 781 279 Z';
  const shell = 'M510 190Q650 109 804 175L839 280 810 394 743 467 608 466 541 407 499 278Z';
  const image = '<image href="assets/mask.png" width="1000" height="558"/>';
  svg.innerHTML = `<defs>
    <mask id="holo-shell-mask"><rect width="1000" height="558" fill="white"/><path d="${lens}" fill="black"/><path d="${lower}" fill="black"/><path d="${strap}" fill="black"/><path d="${sensor}" fill="black"/></mask>
    <clipPath id="holo-lens"><path d="${lens}"/></clipPath><clipPath id="holo-lower"><path d="${lower}"/></clipPath><clipPath id="holo-strap"><path d="${strap}"/></clipPath><clipPath id="holo-sensor"><path d="${sensor}"/></clipPath>
    <pattern id="holo-grid" width="15" height="15" patternUnits="userSpaceOnUse"><path d="M15 0H0V15" fill="none" stroke="#baffdb" stroke-width=".45" opacity=".45"/></pattern>
    <linearGradient id="holo-glass" x2="1" y2="1"><stop stop-color="#baffdb" stop-opacity=".15"/><stop offset="1" stop-color="#50ffc8" stop-opacity=".02"/></linearGradient>
  </defs>
  <g class="holo-assembly">
    <g class="holo-ghost"><path data-ghost="lens" d="${lens}"/><path data-ghost="lower" d="${lower}"/><path data-ghost="sensor" d="${sensor}"/><path data-ghost="strap" d="${strap}"/><path data-ghost="shell" d="${shell}"/></g>
    <g class="holo-piece holo-strap"> <g clip-path="url(#holo-strap)">${image}</g><path class="holo-wire" d="M797 140Q920 116 906 222L896 300M839 402Q914 502 845 481"/><g class="holo-label"><path d="M880 170L932 110H985"/><text x="933" y="98">04 / FIT SYSTEM</text></g></g>
    <g class="holo-piece holo-shell"><g mask="url(#holo-shell-mask)">${image}</g><path class="holo-wire" d="${shell}"/><g class="holo-label"><path d="M620 161L564 119H464"/><text x="464" y="107">05 / OUTER FRAME</text></g></g>
    <g class="holo-piece holo-lower"><g clip-path="url(#holo-lower)">${image}</g><path class="holo-wire" d="${lower}"/><g class="holo-label"><path d="M629 407L552 480H473"/><text x="473" y="497">03 / LOWER HOUSING</text><circle cx="629" cy="407" r="3"/></g></g>
    <g class="holo-piece holo-sensor"><g clip-path="url(#holo-sensor)">${image}</g><path class="holo-wire" d="${sensor}"/><g class="holo-label"><path d="M821 240L884 263H965"/><text x="883" y="281">02 / SENSOR ARRAY</text><circle cx="821" cy="240" r="3"/></g></g>
    <g class="holo-piece holo-lens"><g clip-path="url(#holo-lens)">${image}<path class="holo-glass" d="${lens}" fill="url(#holo-glass)"/><path class="holo-mesh" d="${lens}" fill="url(#holo-grid)"/></g><path class="holo-wire" d="${lens}"/><g class="holo-label"><path d="M552 215L475 153H390"/><text x="390" y="140">01 / ADAPTIVE OPTIC</text><circle cx="552" cy="215" r="3"/></g></g>
    <g class="holo-projection"><path d="M570 186L748 163 752 288 573 316Z"/><path d="M580 198L738 176M581 207L738 185M584 283L732 262"/><circle cx="666" cy="236" r="27"/><path d="M666 202V270M632 236H700"/><text x="592" y="243">24.8</text><text x="704" y="219">142°</text><text x="605" y="294">NERION / OPTICAL LAYER</text></g>
  </g><g class="holo-hit-zones" fill="transparent"><path class="holo-hit" data-piece="shell" d="${shell}"/><path class="holo-hit" data-piece="strap" d="${strap}"/><path class="holo-hit" data-piece="lower" d="${lower}"/><path class="holo-hit" data-piece="sensor" d="${sensor}"/><path class="holo-hit" data-piece="lens" d="${lens}"/></g>`;
  art.append(svg);
  const floatLayer=document.createElement('div');
  floatLayer.className='holo-float-layer';
  art.append(floatLayer);floatLayer.append(svg);
  // Six clipped pieces shared a 4000px texture. Use one display-sized texture
  // for the interactive layers; keep the original asset untouched.
  async function prepareTexture() {
    try {
      await still.decode();
      const maxWidth=matchMedia('(max-width:600px)').matches?1200:1800;
      if(still.naturalWidth<=maxWidth)return;
      const texture=document.createElement('canvas');texture.width=maxWidth;
      texture.height=Math.round(maxWidth*still.naturalHeight/still.naturalWidth);
      texture.getContext('2d').drawImage(still,0,0,texture.width,texture.height);
      const url=texture.toDataURL('image/png');
      svg.querySelectorAll('image').forEach(image=>image.setAttribute('href',url));
    } catch { /* Keep the original render if texture preparation is unavailable. */ }
  }
  prepareTexture();
  // Move the art and stationary hit zones together, so hovering remains stable
  // as the entire product floats and follows the pointer.
  const floatGroup = document.createElementNS(svgNS, 'g');
  floatGroup.classList.add('holo-float');
  const tiltGroup = document.createElementNS(svgNS, 'g');
  tiltGroup.classList.add('holo-tilt');
  floatGroup.append(tiltGroup);
  tiltGroup.append(svg.querySelector('.holo-assembly'), svg.querySelector('.holo-hit-zones'));
  svg.append(floatGroup);
  const aura = document.createElement('div');
  aura.className = 'levitation-aura';
  aura.setAttribute('aria-hidden', 'true');
  art.prepend(aura);
  if (!reducedMotion) {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let visible = true, frame = 0;
    function animate() {
      frame = 0;
      if (!visible || document.hidden) return;
      currentX += (targetX-currentX)*.055;
      currentY += (targetY-currentY)*.055;
      tiltGroup.style.transform = `perspective(1100px) rotateX(${-currentY*9}deg) rotateY(${currentX*13}deg) rotateZ(${currentX*1.8}deg)`;
      if (Math.abs(targetX-currentX)+Math.abs(targetY-currentY)>.001) frame = requestAnimationFrame(animate);
    }
    function start() { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(animate); }
    hero.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch' || !finePointer.matches) return;
      const bounds = hero.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, (event.clientX-bounds.left)/bounds.width*2-1));
      targetY = Math.max(-1, Math.min(1, (event.clientY-bounds.top)/bounds.height*2-1));
      start();
    });
    hero.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; start(); });
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      hero.classList.toggle('levitation-paused', !visible);
      if (!visible) {cancelAnimationFrame(frame);frame=0;} else start();
    }).observe(hero);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {cancelAnimationFrame(frame);frame=0;} else start();
    });
    start();
  }
  still.classList.add('holo-original');
  const controls = document.createElement('div');
  controls.className = 'holo-controls';
  const names = {lens: 'OPTIC', sensor: 'SENSOR', lower: 'HOUSING', strap: 'STRAP', shell: 'FRAME'};
  controls.innerHTML = '<div class="holo-component-controls" role="group" aria-label="Explore individual mask components">' + Object.entries(names).map(([piece, name]) => `<button class="holo-component micro" data-piece="${piece}" aria-pressed="false" aria-label="Explore ${name.toLowerCase()}">${name}</button>`).join('') + '</div><span class="holo-instruction micro">HOVER OVER A PIECE TO REVEAL</span>';
  hero.append(controls);
  const annotation = hero.querySelector('.annotation em');
  let active = null;
  let leaveTimer;
  function select(piece) {
    clearTimeout(leaveTimer);
    active = piece;
    hero.classList.toggle('hologram-open', Boolean(piece));
    svg.querySelectorAll('.holo-piece').forEach(node => node.classList.toggle('is-active', Boolean(piece) && node.classList.contains(`holo-${piece}`)));
    svg.querySelectorAll('[data-ghost]').forEach(node => node.classList.toggle('is-active', node.dataset.ghost === piece));
    svg.querySelector('.holo-projection').classList.toggle('is-active', piece === 'lens');
    controls.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.piece === piece)));
    annotation.textContent = piece ? `${names[piece]} / COMPONENT STUDY` : 'HOVER OVER A PIECE TO EXPLORE';
  }
  svg.querySelectorAll('.holo-hit').forEach(hit => {
    hit.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch' && finePointer.matches) select(hit.dataset.piece);
    });
    hit.addEventListener('pointerleave', event => {
      if (event.pointerType !== 'touch') leaveTimer = setTimeout(() => select(null), 100);
    });
    hit.addEventListener('click', event => {
      // Mouse exploration is hover-only; taps toggle a single component.
      if (event.pointerType === 'touch' || !finePointer.matches) select(active === hit.dataset.piece ? null : hit.dataset.piece);
    });
  });
  controls.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => select(active === button.dataset.piece ? null : button.dataset.piece));
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') select(null); });
  select(null);
})();
