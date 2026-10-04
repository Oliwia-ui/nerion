(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)');
  const root = document.documentElement;
  const surface = document.querySelector('.hero');
  const world = document.querySelector('.world-viewport');
  const deep = document.querySelector('.deep');
  const found = new Set();
  let mode = 'optic', scanning = false, scanTimer, pulse = -1;
  const el = (tag, className, html = '') => {const node=document.createElement(tag);node.className=className;node.innerHTML=html;return node;};

  const overlay = el('div','magic-atmosphere','<canvas id="magic-field"></canvas><div class="magic-caustics"></div><div class="magic-scanline"></div><div class="magic-reticle"><i></i><b></b></div>');
  overlay.setAttribute('aria-hidden','true');document.body.append(overlay);
  const cockpit = el('div','magic-cockpit','<div class="cockpit-corner a"></div><div class="cockpit-corner b"></div><div class="cockpit-corner c"></div><div class="cockpit-corner d"></div><div class="cockpit-heading micro">N &nbsp; · &nbsp; 030 &nbsp; · &nbsp; NE &nbsp; · &nbsp; 060 &nbsp; · &nbsp; E</div><div class="cockpit-left micro"><span>N—01 / NEURAL LINK</span><b>CONNECTED</b><div class="signal-wave"></div></div><div class="cockpit-right micro"><span>OPTICAL OVERLAY</span><b id="magic-mode-label">ADAPTIVE</b><span class="magic-demo">CONCEPT TELEMETRY</span></div>');
  cockpit.setAttribute('aria-hidden','true');document.body.append(cockpit);
  const toolbar=el('div','magic-toolbar',`<div class="magic-modes" role="group" aria-label="Vision mode"><button data-mode="optic" aria-pressed="true">01 <span>OPTIC</span></button><button data-mode="sonar" aria-pressed="false">02 <span>SONAR</span></button><button data-mode="bio" aria-pressed="false">03 <span>BIO</span></button></div><button class="magic-scan" aria-label="Send a sonar pulse"><span>◎</span> SCAN</button><button class="magic-visor">ENTER VISOR ↗</button>`);
  document.body.append(toolbar);
  const status=el('div','magic-status micro','<i></i><span>EXPLORATION SYSTEM ONLINE</span><b>00 / 03 SIGNALS</b>');status.setAttribute('role','status');document.body.append(status);
  let statusTimer;
  function announce(text) {status.querySelector('span').textContent=text;status.classList.add('show');clearTimeout(statusTimer);statusTimer=setTimeout(()=>status.classList.remove('show'),4500);}
  const ringMarkup='<div class="holo-orbit orbit-a"></div><div class="holo-orbit orbit-b"></div><div class="holo-orbit orbit-c"></div><div class="holo-orbit orbit-d"></div><span class="orbit-coordinate micro">N—01 / SPATIAL RECONSTRUCTION</span><span class="orbit-coordinate second micro">SYSTEM SYNC · 99.8%</span><div class="orbit-cross">＋</div>';
  [surface,world,document.querySelector('.model-stage')].forEach((scene,index)=>{
    const rings=el('div',`magic-orbits rings-${index}`,ringMarkup);rings.setAttribute('aria-hidden','true');scene.prepend(rings);
  });
  const map=el('div','magic-radar','<div class="radar-sweep"></div><i></i><i></i><i></i><span class="micro">LOCAL FIELD / 30 M</span>');map.setAttribute('aria-hidden','true');world.append(map);

  const signals=[
    {id:'optic',scene:surface,label:'OPTICAL SIGNATURE',number:'01',title:'A second layer of sight.',copy:'The holographic optic is a quiet companion to the world in front of you. Move over the mask to reveal individual components.',meta:'N—01 · ADAPTIVE OPTICS'},
    {id:'bloom',scene:world,label:'BIOLUMINESCENT BLOOM',number:'02',title:'The dark is alive.',copy:'A drifting constellation of bioluminescent life. Bio mode reveals the luminous traces hidden in the surrounding water.',meta:'FIELD NOTE · PELAGIC ZONE'},
    {id:'echo',scene:deep,label:'DISTANT ECHO',number:'03',title:'Something beyond sight.',copy:'A returning sonar pulse reveals an imagined formation beyond the visible field. Follow the signal. There is always more below.',meta:'FIELD NOTE · ACOUSTIC RETURN'}
  ];
  const card=el('aside','magic-discovery','<button class="discovery-close" aria-label="Close discovery">×</button><span class="micro discovery-label"></span><div class="discovery-glyph" aria-hidden="true">◈</div><h3></h3><p></p><span class="micro discovery-meta"></span>');card.hidden=true;card.id='discovery-card';document.body.append(card);
  let selectedSignal=null;
  function closeCard(){card.hidden=true;signals.forEach(s=>s.button.setAttribute('aria-expanded','false'));}
  signals.forEach(s=>{
    const button=el('button',`magic-beacon beacon-${s.id}`,`<span class="beacon-orb"><i></i><i></i><b>＋</b></span><span class="micro">${s.number} / ${s.label}</span>`);
    button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','discovery-card');s.scene.append(button);s.button=button;
    button.addEventListener('click',()=>{
      if(selectedSignal===s&&!card.hidden){closeCard();return;}
      closeCard();selectedSignal=s;found.add(s.id);button.classList.add('discovered');button.setAttribute('aria-expanded','true');
      card.querySelector('.discovery-label').textContent=`SIGNAL ${s.number} / DECODED`;
      card.querySelector('h3').textContent=s.title;card.querySelector('p').textContent=s.copy;card.querySelector('.discovery-meta').textContent=s.meta;card.hidden=false;
      status.querySelector('b').textContent=`0${found.size} / 03 SIGNALS`;
      announce(found.size===3?'ALL SIGNALS DECODED · THE OCEAN IS OPEN':`SIGNAL ${s.number} DECODED`);
    });
  });
  card.querySelector('button').addEventListener('click',()=>{closeCard();selectedSignal?.button.focus({preventScroll:true});});
  function setMode(next){
    mode=next;root.dataset.vision=mode;
    toolbar.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
    document.querySelector('#magic-mode-label').textContent={optic:'ADAPTIVE',sonar:'ACOUSTIC',bio:'BIOLUMINESCENT'}[mode];
    announce({optic:'OPTIC MODE · CLARITY RESTORED',sonar:'SONAR MODE · FOLLOW THE ECHOES',bio:'BIO MODE · THE WATER IS ALIVE'}[mode]);
  }
  toolbar.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
  toolbar.querySelector('.magic-scan').addEventListener('click',()=>{
    if(scanning)return;scanning=true;pulse=performance.now();root.classList.add('pulse-active');
    toolbar.querySelector('.magic-scan').disabled=true;announce('SCANNING THE SURROUNDING WATER…');
    clearTimeout(scanTimer);scanTimer=setTimeout(()=>{scanning=false;root.classList.remove('pulse-active');toolbar.querySelector('.magic-scan').disabled=false;announce(`${3-found.size} UNDECODED SIGNALS · SELECT A GLOWING MARKER`);},2200);
  });

  // Full-screen, controllable concept HUD. No sensor data is requested or implied.
  const visor=el('dialog','visor-dialog',`<div class="visor-ocean"></div><div class="visor-grid"></div><div class="visor-shell"></div><header><span class="micro"><i class="status"></i> NERION / INSIDE THE VISOR</span><button class="visor-close" aria-label="Exit visor">EXIT ×</button></header><div class="visor-compass micro">W &nbsp; · &nbsp; NW &nbsp; · &nbsp; <b>142°</b> &nbsp; · &nbsp; SE &nbsp; · &nbsp; E</div><div class="visor-reticle"><span></span><i></i><b>ENVIRONMENT MAPPED</b></div><div class="visor-depth"><span class="micro">DEPTH</span><b id="visor-depth-number">24.8</b><span class="micro">METRES BELOW THE SURFACE</span></div><div class="visor-stats micro"><div>WATER TEMP<b id="visor-temp">18.4°C</b></div><div>VISIBILITY<b id="visor-visibility">18.0 M</b></div><div>LINK QUALITY<b>99.8%</b></div></div><div class="visor-signal"><span class="micro">◈ &nbsp; BIOLUMINESCENT SIGNATURE</span><p>You are not alone<br>in the blue.</p></div><div class="visor-bottom"><label class="micro" for="visor-depth-slider">EXPLORE THE DEPTH <output id="visor-output">24.8 M</output></label><input id="visor-depth-slider" type="range" min="0" max="40" step=".1" value="24.8"><p class="micro">INTERACTIVE CONCEPT · SIMULATED TELEMETRY</p></div>`);
  document.body.append(visor);let oldOverflow='';
  toolbar.querySelector('.magic-visor').addEventListener('click',()=>{closeCard();oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';visor.showModal();visor.querySelector('.visor-close').focus();});
  visor.querySelector('.visor-close').addEventListener('click',()=>visor.close());
  visor.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;toolbar.querySelector('.magic-visor').focus({preventScroll:true});});
  visor.querySelector('input').addEventListener('input',event=>{
    const depth=Number(event.target.value);document.querySelector('#visor-depth-number').textContent=depth.toFixed(1);document.querySelector('#visor-output').textContent=`${depth.toFixed(1)} M`;
    document.querySelector('#visor-temp').textContent=`${(24-depth*.225).toFixed(1)}°C`;document.querySelector('#visor-visibility').textContent=`${(25-depth*.28).toFixed(1)} M`;
    visor.style.setProperty('--visor-darkness',.1+depth/400);visor.style.setProperty('--visor-shift',`${(depth-24.8)*.7}px`);
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!card.hidden){closeCard();selectedSignal?.button.focus({preventScroll:true});}});

  const canvas=document.querySelector('#magic-field'), ctx=canvas.getContext('2d');
  // Rasterize glow once, then stamp cached sprites instead of blurring every
  // particle on every frame.
  const sprites={};
  for(const [key,color] of Object.entries({optic:'136,244,225',sonar:'115,255,198',bio:'130,170,255'})){
    const sprite=document.createElement('canvas');sprite.width=sprite.height=32;
    const brush=sprite.getContext('2d');const glow=brush.createRadialGradient(16,16,0,16,16,16);
    glow.addColorStop(0,`rgba(${color},1)`);glow.addColorStop(.12,`rgba(${color},.8)`);glow.addColorStop(.4,`rgba(${color},.15)`);glow.addColorStop(1,`rgba(${color},0)`);
    brush.fillStyle=glow;brush.fillRect(0,0,32,32);sprites[key]=sprite;
  }
  let width=innerWidth,height=innerHeight,points=[],raf=0,last=0,mouseX=.5,mouseY=.5,scrollProgress=0;
  function resize(){
    width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio,width<600?1:1.25);canvas.width=width*dpr;canvas.height=height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    points=Array.from({length:width<600?32:64},()=>({x:Math.random(),y:Math.random(),z:Math.random(),phase:Math.random()*Math.PI*2}));
  }
  let scrollQueued=false;
  function onScroll(){scrollQueued=false;scrollProgress=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);root.style.setProperty('--magic-depth',scrollProgress);}
  addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(onScroll);}},{passive:true});
  const reticle=overlay.querySelector('.magic-reticle');
  addEventListener('pointermove',e=>{if(!fine.matches||e.pointerType==='touch')return;mouseX=e.clientX/width;mouseY=e.clientY/height;reticle.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;},{passive:true});
  function draw(time){
    raf=0;if(document.hidden||reduced||visor.open||root.classList.contains('abyss-active'))return;
    if(time-last>32){last=time;ctx.clearRect(0,0,width,height);ctx.globalCompositeOperation='lighter';
      const bio=mode==='bio',sonar=mode==='sonar';
      const rgb=bio?'130,170,255':sonar?'115,255,198':'136,244,225';
      const positions=[];
      points.forEach(p=>{const drift=time*.000008*(.2+p.z);const x=(p.x+Math.sin(time*.00015+p.phase)*.014+(mouseX-.5)*p.z*.025)*width;const y=((p.y-drift-scrollProgress*p.z*.16)%1+1)%1*height;const r=(bio?10:6)*(.3+p.z);positions.push({x,y});ctx.globalAlpha=(.2+Math.sin(time*.001+p.phase)*.12)*(bio?1.8:1);ctx.drawImage(sprites[mode],x-r,y-r,r*2,r*2);});
      ctx.globalAlpha=1;
      ctx.shadowBlur=0;
      if(sonar||bio){ctx.strokeStyle=`rgba(${rgb},.09)`;ctx.lineWidth=.5;for(let i=0;i<positions.length;i+=2){const a=positions[i],b=positions[(i+7)%positions.length];if(Math.hypot(a.x-b.x,a.y-b.y)<130){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}}
      if(bio){for(let j=0;j<4;j++){const x=width*(.16+j*.23)+Math.sin(time*.0003+j)*25,y=height*(.3+.1*Math.sin(time*.0002+j*2));ctx.save();ctx.translate(x,y);ctx.strokeStyle=`rgba(150,178,255,${.15+j*.025})`;ctx.beginPath();ctx.ellipse(0,0,18+j*4,9+j*2,0,Math.PI,Math.PI*2);ctx.stroke();for(let k=-2;k<=2;k++){ctx.beginPath();ctx.moveTo(k*6,0);ctx.bezierCurveTo(k*8+Math.sin(time*.002+j)*9,20,k*5-12,32,k*5,48);ctx.stroke();}ctx.restore();}}
      if(pulse>=0){const elapsed=(time-pulse)/2200;if(elapsed<1){ctx.strokeStyle=`rgba(${rgb},${(1-elapsed)*.7})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(width*.5,height*.5,elapsed*Math.hypot(width,height),0,Math.PI*2);ctx.stroke();}else pulse=-1;}
      ctx.globalCompositeOperation='source-over';
    }
    raf=requestAnimationFrame(draw);
  }
  resize();onScroll();addEventListener('resize',resize);
  if(!reduced)raf=requestAnimationFrame(draw);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else if(!raf&&!reduced)raf=requestAnimationFrame(draw);});
  visor.addEventListener('close',()=>{if(!raf&&!reduced&&!document.hidden)raf=requestAnimationFrame(draw);});
  new MutationObserver(()=>{if(!root.classList.contains('abyss-active')&&!raf&&!reduced&&!document.hidden)raf=requestAnimationFrame(draw);}).observe(root,{attributes:true,attributeFilter:['class']});
  const scenes=[surface,world,document.querySelector('.model-stage'),deep];
  const visibleScenes=new Set();
  function syncScenes(){scenes.forEach(scene=>{const paused=!visibleScenes.has(scene)||document.hidden||visor.open;scene.classList.toggle('offscreen-effects',paused);const viewer=scene.querySelector('#mask-model');if(viewer){if(!paused&&!reduced)viewer.setAttribute('auto-rotate','');else viewer.removeAttribute('auto-rotate');}});}
  const visibility=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)visibleScenes.add(entry.target);else visibleScenes.delete(entry.target);});syncScenes();});
  scenes.forEach(scene=>visibility.observe(scene));document.addEventListener('visibilitychange',syncScenes);
  new MutationObserver(syncScenes).observe(visor,{attributes:true,attributeFilter:['open']});
  // Keep the site menu above the visual instrumentation and controls.
  new MutationObserver(()=>root.classList.toggle('magic-menu-open',document.querySelector('.menu-toggle').getAttribute('aria-expanded')==='true')).observe(document.querySelector('.menu-toggle'),{attributes:true,attributeFilter:['aria-expanded']});
  root.dataset.vision='optic';
})();
