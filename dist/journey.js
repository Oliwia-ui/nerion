(() => {
  const section=document.querySelector('#abyss'),stage=section.querySelector('.abyss-stage');
  const original=stage.querySelector('.opening-video');
  const T=window.NerionJourneyTimeline;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse=matchMedia('(pointer:coarse)').matches;
  const definitions=[
    ['opening','THE AWAKENING','NERION N—01 / DIVE MASK CONCEPT','Beyond the|surface.','#b9e3e6'],
    ['ripple','THE FIRST RIPPLE','NERION / A NEW PERSPECTIVE','One drop.|A new world.','#a6dce9'],
    ['swim','FOLLOW THE CURRENT','A MASK DESIGNED AROUND THE DIVER.','Follow your|own current.','#b4def5'],
    ['reef','ANOTHER PERSPECTIVE','NERION / CLARITY, BY DESIGN','There is more|beneath.','#b3eee4'],
    ['manta','THE ENCOUNTER','LESS DISTRACTION. MORE DISCOVERY.','Let wonder|find you.','#d3eff4'],
    ['light','TOWARD THE LIGHT','MEET THE NERION MASK BELOW.','Stay curious.|Go deeper.','#eff8fa']
  ];
  stage.replaceChildren();
  section.setAttribute('aria-label','Nerion — a journey beneath the surface');
  const chrome=[...document.querySelectorAll('.header,.magic-toolbar,.sound')];
  function el(tag,cls,text){const node=document.createElement(tag);node.className=cls;if(text)node.textContent=text;return node;}
  const scenes=definitions.map(([name,label,eyebrow,title,ink],index)=>{
    const layer=el('div','journey-scene');layer.style.zIndex=index+1;
    const poster=el('img','journey-media journey-poster');
    poster.src=index?`assets/journey-${name}.jpg`:'assets/nerion-opening-poster.jpg';poster.alt='';
    const video=index?el('video','journey-media'):original;
    video.className='journey-media journey-video';video.muted=true;video.playsInline=true;video.preload='none';
    video.setAttribute('muted','');video.setAttribute('playsinline','');video.setAttribute('aria-hidden','true');
    const copy=el('article','journey-copy');copy.style.color=ink;
    const pre=el('p','micro',eyebrow),heading=el(index?'h2':'h1','journey-title');
    heading.setAttribute('aria-label',title.replace('|',' '));const letters=[];
    title.split('|').forEach(line=>{
      const word=el('span','journey-line');word.setAttribute('aria-hidden','true');
      [...line].forEach(char=>{const letter=el('span','journey-letter',char===' '?'\u00a0':char);word.append(letter);letters.push(letter);});heading.append(word);
    });
    copy.append(pre,heading);layer.append(poster,video,el('div','journey-scrim'),copy);stage.append(layer);
    const scene={name,label,layer,poster,video,copy,pre,letters,ready:false,loading:false,visible:false,target:0,url:null,primed:false};
    video.addEventListener('loadeddata',()=>{scene.ready=true;prime(scene);queue();});
    video.addEventListener('seeked',()=>{
      if(Math.abs(video.currentTime-scene.target)<.15)layer.classList.add('has-frame');
      seek(scene);
    });
    video.addEventListener('error',()=>{scene.ready=false;layer.classList.remove('has-frame');});
    return scene;
  });
  const top=el('div','journey-top micro'),brand=el('a','journey-brand','NERION®');brand.href='#abyss';
  const label=el('span','journey-chapter','01 / THE AWAKENING');
  top.append(brand,label);
  const bottom=el('div','journey-bottom micro'),hint=el('span','','SCROLL TO DESCEND ↓'),skip=el('a','','EXPLORE THE SYSTEM ↗');skip.href='#system';bottom.append(hint,skip);
  const track=el('div','journey-progress'),fill=el('i','');track.setAttribute('aria-hidden','true');track.append(fill);
  stage.append(top,bottom,track);
  section.style.setProperty('--journey-height',`${(T.total+1)*100}svh`);
  // Real anchors retain existing navigation and shared links without hidden destinations.
  [['vision',1],['drift',2]].forEach(([id,index])=>{
    const anchor=el('span','journey-anchor');anchor.id=id;
    anchor.style.top=`${T.segments[index].start/(T.total+1)*100}%`;section.append(anchor);
  });
  document.querySelectorAll('a[href="#surface"]').forEach(a=>a.setAttribute('href','#abyss'));
  let frame=0,position=null,last=0,width=innerWidth,visible=true,userGesture=false;
  function prime(s){
    if(!coarse||!userGesture||s.primed||!s.ready||reduce)return;
    s.primed=true;
    s.video.play().then(()=>{s.video.pause();seek(s);}).catch(()=>{s.primed=false;});
  }
  async function load(s){
    if(reduce||s.loading)return;s.loading=true;
    try{
      const src=s.name==='opening'?'assets/nerion-opening.mp4':`assets/journey-${s.name}.mp4`;
      const response=await fetch(src);if(!response.ok)throw new Error('Video unavailable');
      s.url=URL.createObjectURL(await response.blob());s.video.src=s.url;s.video.load();
    }catch{s.layer.classList.add('still-only');}
  }
  function seek(s){
    if(reduce||!visible||document.hidden||!s.visible||!s.ready||s.video.seeking)return;
    if(Math.abs(s.video.currentTime-s.target)>1/30)s.video.currentTime=s.target;
    else s.layer.classList.add('has-frame');
  }
  function update(now){
    frame=0;const rect=section.getBoundingClientRect();visible=rect.bottom>0&&rect.top<innerHeight;
    const target=T.clamp(-rect.top/Math.max(1,section.offsetHeight-stage.offsetHeight))*T.total;
    const dt=Math.min(50,Math.max(1,now-last||16.67));last=now;
    if(position===null||reduce||!visible)position=target;
    else position+=(target-position)*(1-Math.exp(-dt/130));
    if(Math.abs(position-target)<.0002)position=target;
    const states=T.sample(position);
    let current=0;
    states.forEach((state,i)=>{
      const s=scenes[i],segment=T.segments[i];
      s.visible=state.opacity>.001;
      if(position>=segment.start+T.overlap*.5)current=i;
      if(visible&&target>segment.start-2&&target<segment.end+1)load(s);
      if(reduce){s.layer.style.opacity=1;s.copy.style.opacity=1;s.pre.style.opacity=1;return;}
      s.layer.style.opacity=state.opacity;
      s.layer.style.visibility=s.visible?'visible':'hidden';
      s.layer.style.filter=`grayscale(${state.gray})`;
      s.copy.setAttribute('aria-hidden',String(state.copy<.05));
      s.pre.style.opacity=state.copy;
      s.copy.style.color=i===0?`rgb(${238-64*(1-state.gray)} ${238-14*(1-state.gray)} 238)`:definitions[i][4];
      s.letters.forEach((letter,j)=>{
        const pose=T.letterPose(i,j,s.letters.length,state.local,state.leave);
        letter.style.opacity=pose.opacity;
        letter.style.transform=pose.transform;
      });
      s.target=state.time*Math.max(0,(s.video.duration||0)-.05);seek(s);
    });
    const sceneLabel=`0${current+1} / ${scenes[current].label}`;
    if(label.textContent!==sceneLabel)label.textContent=sceneLabel;
    const blue=T.smooth((position-1.6)/5);
    stage.style.setProperty('--journey-blue',blue*.13);
    const finish=1-T.smooth((position-(T.total-.6))/.6);
    stage.style.setProperty('--journey-finish',reduce?1:finish);
    fill.style.transform=`scaleX(${position/T.total})`;
    const active=rect.bottom>innerHeight*.5;
    if(document.documentElement.classList.contains('abyss-active')!==active)document.documentElement.classList.toggle('abyss-active',active);
    chrome.forEach(node=>{node.inert=active;});
    if(position!==target&&visible&&!document.hidden)queue();
  }
  function queue(){if(!frame&&!document.hidden)frame=requestAnimationFrame(update);}
  addEventListener('scroll',queue,{passive:true});
  addEventListener('resize',()=>{if(coarse&&width===innerWidth)return;width=innerWidth;queue();});
  addEventListener('pointerdown',()=>{userGesture=true;scenes.forEach(prime);},{passive:true});
  document.addEventListener('visibilitychange',queue);
  addEventListener('pagehide',event=>{if(!event.persisted)scenes.forEach(s=>{if(s.url)URL.revokeObjectURL(s.url);});});
  if(reduce){
    section.querySelectorAll('.journey-anchor').forEach((anchor,index)=>{anchor.style.top=`${(index+1)/6*100}%`;});
  }
  // Newly constructed anchors must also work when arriving directly from a shared URL.
  if(location.hash==='#vision'||location.hash==='#drift')document.querySelector(location.hash)?.scrollIntoView();
  queue();
})();
