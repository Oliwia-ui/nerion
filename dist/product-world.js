(() => {
  const section=document.querySelector('#system');
  const track=section.querySelector('.system-scroll-track');
  const stage=section.querySelector('.system-scroll-stage');
  const model=section.querySelector('#mask-model');
  // Drag still rotates the mask; wheel gestures belong to the page, not the camera.
  model.setAttribute('disable-zoom','');
  model.setAttribute('touch-action','pan-y');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('product-world');
  const clamp=n=>Math.max(0,Math.min(1,n));
  const smooth=n=>{n=clamp(n);return n*n*(3-2*n);};
  const stories=[
    ['01 / MEET NERION','Your dive computer.<br><span>Inside your mask.</span>','A scuba mask with an integrated screen. Dive information, right where you look.'],
    ['02 / INSIDE THE LENS','Information.<br><span>In your field of view.</span>','The screen sits inside the mask, bringing your dive-computer information into the view in front of you.'],
    ['03 / MADE FOR SCUBA','Look into the blue.<br><span>Not down at a device.</span>','Nerion brings the mask and dive-computer display together. A different way to stay connected to your dive.'],
    ['04 / EXPLORE N—01','Quietly<br><span>extraordinary.</span>','Turn the mask. Explore the display. Discover a new perspective on scuba diving.']
  ];
  const copy=document.createElement('div');copy.className='product-stories';
  const panels=stories.map(([label,title,body])=>{
    const panel=document.createElement('article');panel.className='product-story';
    panel.innerHTML=`<p class="micro">${label}</p><h2>${title}</h2><p class="product-description">${body}</p>`;
    copy.append(panel);return panel;
  });
  stage.append(copy);
  const display=document.createElement('div');display.className='product-display';
  display.innerHTML=`<div class="lens-hud">
    <div class="lens-hud-top micro"><span>NERION / OPTICAL LINK</span><span>▰ ▰ ▰ ▱</span></div>
    <svg viewBox="0 0 360 250" role="img" aria-label="Illustrative in-mask display with heading, depth, dive time, battery and navigation graphics">
      <defs><pattern id="lens-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width=".6"/></pattern></defs>
      <g fill="none" stroke="currentColor" stroke-width="1">
        <path d="M12 26Q180 -9 348 26M35 21v7m12-10v6m12-9v7m12-9v7m12-9v8m12-9v7m170-6v7m12-5v7m12-5v7m12-4v7m12-4v7"/>
        <circle cx="64" cy="76" r="30"/><circle cx="180" cy="76" r="30"/><circle cx="296" cy="76" r="30"/>
        <path d="M280 88l16-30 16 30-16-8zM12 134h22v11H12zm22 3h3v5h-3M17 136v7m5-7v7m5-7v7"/>
        <rect x="86" y="127" width="250" height="96" fill="url(#lens-grid)"/>
        <path d="M90 202l34-22 28 9 36-38 40 22 34-30 31 23 40-25M102 216l89-47 127 46"/>
        <circle cx="191" cy="169" r="9"/><path d="M191 153v32m-16-16h32M21 176h21l-21 34h21z"/>
      </g>
      <g fill="currentColor" text-anchor="middle" font-family="monospace">
        <text x="64" y="82" font-size="17">18.4</text><text x="180" y="82" font-size="17">24</text>
        <text x="64" y="119" font-size="7">DEPTH / M</text><text x="180" y="119" font-size="7">DIVE / MIN</text><text x="296" y="119" font-size="7">142° / SE</text>
        <text x="210" y="240" font-size="7" letter-spacing="2">INFORMATION IN VIEW</text>
      </g>
    </svg>
    <p class="micro lens-demo">ILLUSTRATIVE INTERFACE · SIMULATED DATA</p>
  </div>`;
  stage.append(display);
  const controls=document.createElement('div');controls.className='product-controls';
  controls.innerHTML='<button type="button" aria-pressed="false">Preview the display ＋</button><button type="button">Reset mask view ↺</button>';
  stage.append(controls);
  const [preview,reset]=controls.querySelectorAll('button');let manualDisplay=false;
  preview.addEventListener('click',()=>{manualDisplay=!manualDisplay;preview.setAttribute('aria-pressed',String(manualDisplay));preview.textContent=manualDisplay?'Hide the display −':'Preview the display ＋';queue();});
  reset.addEventListener('click',()=>{model.setAttribute('camera-orbit','90deg 90deg 110%');});
  model.addEventListener('pointerdown',()=>{userRotating=true;});
  section.querySelector('.model-code').innerHTML='N—01<br>NERION DIVE MASK';
  const tabs=[...section.querySelectorAll('.feature-tabs button')];
  const features=[
    ['Integrated display','INSIDE THE MASK','A screen inside the mask brings dive information into your field of view.'],
    ['Dive computer','ONE CONNECTED VIEW','Nerion combines the role of a dive-computer display with the mask you look through.'],
    ['For scuba divers','DESIGNED AROUND YOUR DIVE','Dive information stays in view, instead of requiring a glance down at a separate device.']
  ];
  const detail=section.querySelector('#feature-detail');
  // Keep the product features in the same pinned view as the mask and story.
  const featurePanel=document.createElement('div');featurePanel.className='product-features';
  featurePanel.append(section.querySelector('.feature-tabs'),detail);
  stage.append(featurePanel);
  function describe(i){detail.querySelector('span').textContent=features[i][1];detail.querySelector('p').textContent=features[i][2];}
  tabs.forEach((tab,i)=>{tab.innerHTML=`<small>0${i+1}</small> ${features[i][0]} <span>↗</span>`;tab.addEventListener('click',()=>describe(i));});
  // Existing keyboard navigation updates aria-selected synchronously.
  section.querySelector('.feature-tabs').addEventListener('keydown',()=>queueMicrotask(()=>describe(tabs.findIndex(tab=>tab.getAttribute('aria-selected')==='true'))));
  describe(0);
  const deep=document.querySelector('#depth');
  deep.querySelector('.deep-copy h2').innerHTML='The ocean ahead.<br><span>Your dive in view.</span>';
  deep.querySelector('.deep-copy .body-copy').textContent='Nerion. A scuba mask with an integrated dive-computer display.';
  deep.querySelector('.simulation').textContent='ILLUSTRATIVE DISPLAY / NOT LIVE DIVE DATA';
  const footer=document.querySelector('footer');footer.classList.add('loop-ending');
  footer.querySelector('h2').innerHTML='Nerion.<br><span>Back to the blue.</span>';
  footer.querySelector(':scope > .micro').textContent='YOUR DIVE COMPUTER. INSIDE YOUR MASK.';
  footer.querySelector('.footer-bottom>span:last-child').textContent='© NERION 2026 · DESIGN PROJECT — NOT AVAILABLE FOR PURCHASE';
  let frame=0,position=null,last=0,userRotating=false,lastPhase=-1;
  function update(now){
    frame=0;const rect=track.getBoundingClientRect();
    const target=clamp(-rect.top/Math.max(1,track.offsetHeight-stage.offsetHeight));
    const dt=Math.min(40,Math.max(1,now-last||16));last=now;
    if(position===null||reduced||rect.bottom<=0)position=target;
    else position+=(target-position)*(1-Math.exp(-dt/150));
    if(Math.abs(position-target)<.0001)position=target;
    const phase=Math.min(3,Math.floor(position*4));
    if(phase!==lastPhase){userRotating=false;lastPhase=phase;}
    panels.forEach((panel,i)=>{
      const local=position*4-i;
      const opacity=reduced?1:(i===0?1:smooth((local+.06)/.2))*(i===3?1:1-smooth((local-.78)/.22));
      panel.style.opacity=opacity;panel.style.transform=reduced?'none':`translate3d(${i%2?(1-opacity)*-24:0}px,${i%2?0:(1-opacity)*26}px,0)`;
      panel.setAttribute('aria-hidden',String(opacity<.05));
    });
    const reveal=reduced?1:smooth((position-.25)/.1)*(1-smooth((position-.67)/.1));
    display.style.opacity=manualDisplay?1:reveal;
    display.setAttribute('aria-hidden',String(!manualDisplay&&reveal<.05));
    stage.style.setProperty('--lens-reveal',reveal);
    if(!reduced&&!userRotating&&rect.top<innerHeight&&rect.bottom>0){
      const angle=90+Math.sin(position*Math.PI*2)*23;
      model.setAttribute('camera-orbit',`${angle.toFixed(2)}deg ${(90-position*7).toFixed(2)}deg ${(110-reveal*13).toFixed(2)}%`);
    }
    if(position!==target&&rect.bottom>0&&!document.hidden)queue();
  }
  function queue(){if(!frame&&!document.hidden)frame=requestAnimationFrame(update);}
  addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);document.addEventListener('visibilitychange',queue);queue();
})();
