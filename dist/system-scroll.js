(() => {
  const section=document.querySelector('#system');
  if(!section)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const track=document.createElement('div');track.className='system-scroll-track';
  const stage=document.createElement('div');stage.className='system-scroll-stage';
  section.prepend(track);track.append(stage);
  ['.section-heading','.system-title','.model-stage'].forEach(selector=>stage.append(section.querySelector(selector)));
  const model=section.querySelector('#mask-model');
  model.setAttribute('camera-orbit','90deg 90deg 110%');
  model.setAttribute('field-of-view','30deg');
  model.removeAttribute('auto-rotate');
  section.querySelector('.model-hint').textContent='↔ DRAG THE MASK · EXPLORE IN 3D';
  const ribbon=document.createElement('div');ribbon.className='journey-ribbon system-ribbon';ribbon.setAttribute('aria-hidden','true');
  const text=document.createElement('div');text.className='journey-ribbon-track';
  for(let i=0;i<4;i++){
    const repeat=document.createElement('span');
    repeat.textContent='BEYOND THE SURFACE  ·  FOLLOW YOUR OWN CURRENT  ·  ';
    text.append(repeat);
  }
  ribbon.append(text);stage.append(ribbon);
  let frame=0;
  function update(){
    frame=0;if(document.hidden)return;
    const rect=track.getBoundingClientRect();
    const focused=rect.top<innerHeight*.5&&rect.bottom>innerHeight*.5;
    if(document.documentElement.classList.contains('product-focus')!==focused)document.documentElement.classList.toggle('product-focus',focused);
    if(reduced)return;
    if(rect.bottom<0||rect.top>innerHeight)return;
    const progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,track.offsetHeight-stage.offsetHeight)));
    // One repeated phrase travels across the hold; no autonomous animation loop.
    text.style.transform=`translate3d(${-progress*25}%,0,0)`;
  }
  function queue(){if(!frame&&!document.hidden)frame=requestAnimationFrame(update);}
  addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);
  document.addEventListener('visibilitychange',queue);queue();
})();
