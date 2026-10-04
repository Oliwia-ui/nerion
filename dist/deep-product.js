(() => {
  const section = document.querySelector('#depth');
  if (!section) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  section.classList.add('deep-product');
  section.setAttribute('aria-label', 'Nerion in the water');
  const stage = document.createElement('div'); stage.className = 'deep-product-stage';
  stage.innerHTML = `
    <img class="dive-film-poster" src="assets/diver-poster.jpg" alt="A scuba diver moving through blue water">
    <video class="dive-film" muted playsinline preload="none" aria-hidden="true"></video>
    <div class="dive-film-shade"></div>
    <div class="dive-film-label micro"><span>03 / NERION IN THE WATER</span><span>MASK + INTEGRATED DISPLAY</span></div>
    <div class="dive-stories">
      <article><p class="micro">01 / A DIFFERENT PERSPECTIVE</p><h2>The ocean ahead.<br><span>Your dive in view.</span></h2><p>A scuba mask. A dive-computer display.<br>One view into the blue.</p></article>
      <article><p class="micro">02 / INSIDE THE LENS</p><h2>Your information.<br><span>Not out of sight.</span></h2><p>Depth, direction and dive time, presented inside the mask. Information where you are already looking.</p></article>
      <article><p class="micro">03 / MEET YOUR NEW VIEW</p><h2>Look through<br><span>Nerion.</span></h2><p>Explore how the integrated screen brings your dive information into view.</p><button type="button" class="dive-enter">Enter the visor <span>↗</span></button></article>
    </div>
    <div class="dive-readouts" aria-label="Illustrative in-mask readouts">
      <div><span>DEPTH</span><strong>24.8 <small>M</small></strong></div>
      <div><span>HEADING</span><strong>142° <small>SE</small></strong></div>
      <div><span>DIVE TIME</span><strong>24 <small>MIN</small></strong></div>
      <p>ILLUSTRATIVE DISPLAY · SIMULATED DATA</p>
    </div>
    <a class="dive-product-link" href="#system"><img src="assets/mask.png" alt="Nerion dive mask"><span class="micro">N—01 / EXPLORE THE MASK ↗</span></a>
    <div class="dive-film-footer micro"><span>SCROLL TO EXPLORE ↓</span><div aria-hidden="true"><i></i></div><span>NERION / SCUBA</span></div>`;
  // Keep the old DOM available to existing scene observers, but out of this story.
  [...section.children].forEach(child => { child.hidden = true; });
  section.append(stage);
  const video = stage.querySelector('video'); video.muted = true;
  const stories = [...stage.querySelectorAll('article')];
  const readouts = stage.querySelector('.dive-readouts');
  const enter = stage.querySelector('.dive-enter');
  const visor = document.querySelector('.visor-dialog');
  let openedHere = false;
  enter.addEventListener('click', () => { openedHere = true; document.querySelector('.magic-visor').click(); });
  visor.addEventListener('close', () => { if (openedHere) { enter.focus({preventScroll:true}); openedHere = false; } });
  const clamp = n => Math.max(0, Math.min(1,n));
  const smooth = n => { n = clamp(n); return n*n*(3-2*n); };
  let frame = 0, position = null, last = 0, targetTime = 0, loading = false, visible = false, blobURL;
  async function load() {
    if (loading || reduced) return;
    loading = true;
    try {
      const response = await fetch('assets/nerion-diver.mp4');
      if (!response.ok) throw new Error('Film unavailable');
      blobURL = URL.createObjectURL(await response.blob());
      video.src = blobURL; video.load();
    } catch { stage.classList.add('film-unavailable'); }
  }
  function seek() {
    if (reduced || !visible || document.hidden || video.readyState < 2 || video.seeking) return;
    if (Math.abs(video.currentTime-targetTime) > .04) video.currentTime = targetTime;
  }
  video.addEventListener('loadeddata', queue);
  video.addEventListener('seeked', () => { stage.classList.add('film-ready'); seek(); });
  // iOS may need a muted play/pause gesture before it paints seeked frames.
  stage.addEventListener('touchstart', () => {
    if (!reduced && video.readyState >= 2) video.play().then(() => { video.pause(); seek(); }).catch(() => {});
  }, {passive:true});
  function update(now) {
    frame = 0;
    const rect = section.getBoundingClientRect();
    visible = rect.top < innerHeight && rect.bottom > 0;
    document.documentElement.classList.toggle('deep-product-focus', visible && rect.top < innerHeight*.4 && rect.bottom > innerHeight*.6);
    if (rect.top < innerHeight*2 && rect.bottom > 0) load();
    const target = clamp(-rect.top / Math.max(1, section.offsetHeight-stage.offsetHeight));
    const dt = Math.min(40, Math.max(1, now-last || 16)); last = now;
    if (position === null || reduced || !visible) position = target;
    else position += (target-position)*(1-Math.exp(-dt/160));
    if (Math.abs(position-target)<.0001) position=target;
    stories.forEach((story,i) => {
      const local=position*3-i;
      const opacity=reduced?1:(i===0?1:smooth((local+.05)/.24))*(i===2?1:1-smooth((local-.75)/.25));
      story.style.opacity=opacity;
      story.style.transform=reduced?'none':`translate3d(0,${(1-opacity)*22}px,0)`;
      story.inert=opacity<.1;
      story.setAttribute('aria-hidden',String(opacity<.1));
    });
    const reveal=reduced?1:smooth((position-.26)/.12);
    readouts.style.opacity=reveal;
    readouts.style.transform=`translateY(${(1-reveal)*18}px)`;
    readouts.setAttribute('aria-hidden',String(reveal<.1));
    stage.querySelector('.dive-film-footer i').style.transform=`scaleX(${position})`;
    if (Number.isFinite(video.duration)) targetTime=.05+position*Math.max(0,video.duration-.15);
    seek();
    if (position!==target && visible) queue();
  }
  function queue() { if (!frame && !document.hidden) frame=requestAnimationFrame(update); }
  addEventListener('scroll',queue,{passive:true}); addEventListener('resize',queue);
  document.addEventListener('visibilitychange',queue);
  addEventListener('pagehide',event=>{ if (!event.persisted && blobURL) URL.revokeObjectURL(blobURL); });
  queue();
})();
