(() => {
  if(document.querySelector('.opening-video'))return;
  const intro=document.querySelector('.abyss-intro');
  const stage=intro.querySelector('.abyss-stage');
  const follow=intro.querySelector('.abyss-mask-follow');
  const model=intro.querySelector('#abyss-model');
  // Pull the first mask back before the holographic product reveal.
  model.setAttribute('max-camera-orbit','auto auto 300%');
  const landing=document.querySelector('#surface');
  const skipSurface=document.documentElement.classList.contains('skip-surface');
  if(skipSurface){
    document.querySelectorAll('a[href="#surface"]').forEach(link=>link.setAttribute('href','#abyss'));
    intro.querySelector('.abyss-cue').setAttribute('href','#vision');
  }
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const fine=matchMedia('(hover:hover) and (pointer:fine)');
  const clamp=n=>Math.max(0,Math.min(1,n));
  const smooth=n=>n*n*(3-2*n);
  let targetX=0,targetY=0,x=0,y=0,frame=0,scrollFrame=0,visible=true;
  let lastOrbit='';
  let pullback=0;
  let easedProgress=null,lastScrollTime=0;
  function updateCamera(){
    const orbit=`${(90-x*55*(1-pullback)).toFixed(1)}deg ${(90-y*24*(1-pullback)).toFixed(1)}deg ${(110+pullback*145).toFixed(1)}%`;
    if(orbit!==lastOrbit){model.setAttribute('camera-orbit',orbit);lastOrbit=orbit;}
    follow.style.transform=`translate3d(${x*48*(1-pullback)}px,${y*28*(1-pullback)}px,0)`;
  }
  const chrome=[...document.querySelectorAll('.header,.magic-toolbar,.sound')];
  function updateScroll(timestamp=performance.now()){
    scrollFrame=0;
    const rect=intro.getBoundingClientRect();
    const targetProgress=clamp(-rect.top/Math.max(1,intro.offsetHeight-stage.offsetHeight));
    const elapsed=Math.min(32,Math.max(1,timestamp-lastScrollTime||16.67));
    lastScrollTime=timestamp;
    // One time-based damping curve keeps camera, scan, and reveal in lockstep.
    // Native page scrolling stays untouched; only cinematic values are eased.
    if(easedProgress===null||reduced||rect.bottom<=0||document.hidden)easedProgress=targetProgress;
    else easedProgress+=(targetProgress-easedProgress)*(1-Math.exp(-elapsed/180));
    if(Math.abs(targetProgress-easedProgress)<.0001)easedProgress=targetProgress;
    // Reserve the final third for a slow copy reveal and a readable landing hold.
    const progress=skipSurface?easedProgress:clamp(easedProgress/.66);
    const textReveal=smooth(clamp((easedProgress-.70)/.14));
    const reveal=smooth(clamp((progress-.08)/.4));
    pullback=reduced?0:smooth(clamp((progress-.44)/.28));
    const departure=skipSurface?0:smooth(clamp((progress-.58)/.16));
    const arrival=smooth(clamp((progress-.58)/.22));
    // Establish the complete sketch first, then fill it without changing size.
    const materialize=smooth(clamp((progress-.80)/.20));
    stage.style.setProperty('--reveal',reveal);
    stage.style.setProperty('--whisper',1-smooth(clamp(progress/.23)));
    stage.style.setProperty('--mask-scale',.8+Math.min(progress,.5)*.28);
    stage.style.setProperty('--approach',pullback);
    stage.style.setProperty('--rise',`${(1-reveal)*65}px`);
    stage.style.setProperty('--arrival',departure);
    landing.style.setProperty('--landing-reveal',arrival);
    landing.style.setProperty('--landing-scale',1);
    landing.style.setProperty('--materialize',reduced?1:materialize);
    landing.classList.toggle('is-materializing',!reduced&&materialize<1);
    landing.style.setProperty('--text-reveal',textReveal);
    landing.classList.toggle('is-arrived',textReveal>0);
    // Hold the destination in the viewport during the visor crossfade.
    landing.style.setProperty('--landing-offset',`${-Math.max(0,rect.bottom-stage.offsetHeight)}px`);
    landing.inert=textReveal<.95;
    updateCamera();
    const active=skipSurface?rect.bottom>innerHeight*.5:easedProgress<.80;
    document.documentElement.classList.toggle('abyss-active',active);
    chrome.forEach(node=>{node.inert=active;});
    visible=rect.bottom>0&&rect.top<innerHeight;
    if(!visible){cancelAnimationFrame(frame);frame=0;}
    if(easedProgress!==targetProgress&&!document.hidden)scrollFrame=requestAnimationFrame(updateScroll);
  }
  function animate(){
    frame=0;if(!visible||document.hidden||reduced)return;
    x+=(targetX-x)*.075;y+=(targetY-y)*.075;
    // Rotate the actual GLB camera around its geometry, rather than skewing an image.
    // Translation gives the floating object a little travel toward the pointer.
    updateCamera();
    if(Math.abs(targetX-x)+Math.abs(targetY-y)>.001)frame=requestAnimationFrame(animate);
  }
  function start(){if(!frame&&!reduced&&visible&&!document.hidden)frame=requestAnimationFrame(animate);}
  stage.addEventListener('pointermove',event=>{if(event.pointerType==='touch'||!fine.matches)return;const rect=stage.getBoundingClientRect();targetX=clamp((event.clientX-rect.left)/rect.width)*2-1;targetY=clamp((event.clientY-rect.top)/rect.height)*2-1;start();});
  stage.addEventListener('pointerleave',()=>{targetX=targetY=0;start();});
  function queue(){if(!scrollFrame){lastScrollTime=performance.now();scrollFrame=requestAnimationFrame(updateScroll);}}
  addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;}else start();});
  model.addEventListener('load',start);
  updateScroll();
})();
