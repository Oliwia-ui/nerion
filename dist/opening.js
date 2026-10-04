(() => {
  if(document.documentElement.classList.contains?.('film-journey'))return;
  const section=document.querySelector('#abyss');
  const video=section?.querySelector('.opening-video');
  if(!video)return;
  const stage=section.querySelector('.abyss-stage');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const coarse=matchMedia('(pointer:coarse)').matches;
  const chrome=[...document.querySelectorAll('.header,.magic-toolbar,.sound')];
  const clamp=n=>Math.max(0,Math.min(1,n));
  const ease=n=>{n=clamp(n);return n*n*(3-2*n);};
  const letters=[];
  section.querySelectorAll('.opening-word').forEach(word=>{
    const text=word.textContent;word.textContent='';
    [...text].forEach(char=>{
      const span=document.createElement('span');span.className='opening-letter';
      span.textContent=char===' '?'\u00a0':char;word.appendChild(span);letters.push(span);
    });
  });
  document.querySelectorAll('a[href="#surface"]').forEach(link=>link.setAttribute('href','#abyss'));
  section.querySelector('.abyss-cue').setAttribute('href','#vision');
  let frame=0,progress=null,last=0,targetTime=0,ready=false,visible=true,objectUrl;
  let width=innerWidth,primed=false;
  function seek(){
    if(!ready||reduced||!visible||document.hidden||video.seeking)return;
    if(Math.abs(video.currentTime-targetTime)>1/30)video.currentTime=targetTime;
  }
  function update(now){
    frame=0;
    const rect=section.getBoundingClientRect();
    visible=rect.bottom>0&&rect.top<innerHeight;
    const target=clamp(-rect.top/Math.max(1,section.offsetHeight-stage.offsetHeight));
    const dt=Math.min(50,Math.max(1,now-last||16.67));last=now;
    if(progress===null||reduced||!visible)progress=target;
    else progress+=(target-progress)*(1-Math.exp(-dt/110));
    if(Math.abs(target-progress)<.0001)progress=target;
    const color=reduced?1:ease((progress-.32)/.36);
    const exit=reduced?1:1-ease((progress-.89)/.11);
    stage.style.setProperty('--opening-gray',1-color);
    stage.style.setProperty('--opening-opacity',reduced?1:ease(progress/.08)*exit);
    stage.style.setProperty('--opening-exit',exit);
    stage.style.setProperty('--opening-copy',reduced?1:ease((progress-.32)/.25));
    stage.style.setProperty('--opening-ink',`rgb(${Math.round(238-77*color)} ${Math.round(238-13*color)} ${Math.round(238-31*color)})`);
    letters.forEach((letter,i)=>{
      const amount=reduced?1:ease((progress-.28-(i%7)*.023)/.25);
      letter.style.opacity=amount;
      letter.style.transform=`translate3d(0,${(1-amount)*(i%2?95:-95)}px,0)`;
    });
    targetTime=clamp(progress/.76)*Math.max(0,(video.duration||0)-.05);seek();
    const active=rect.bottom>innerHeight*.5;
    document.documentElement.classList.toggle('abyss-active',active);
    chrome.forEach(node=>{node.inert=active;});
    if(progress!==target&&visible&&!document.hidden)queue();
  }
  function queue(){if(!frame&&!document.hidden)frame=requestAnimationFrame(update);}
  function prime(){
    if(!coarse||primed||!ready||reduced)return;
    primed=true;
    video.play().then(()=>{video.pause();seek();}).catch(()=>{primed=false;});
  }
  video.addEventListener('loadeddata',()=>{ready=true;queue();});
  video.addEventListener('seeked',seek);
  video.addEventListener('error',()=>{ready=false;section.querySelector('.opening-hint').textContent='A DIFFERENT WAY TO SEE.';});
  if(!reduced)fetch(video.dataset.src).then(response=>{
    if(!response.ok)throw new Error('Opening unavailable');return response.blob();
  }).then(blob=>{objectUrl=URL.createObjectURL(blob);video.src=objectUrl;video.load();})
    .catch(()=>{section.querySelector('.opening-hint').textContent='A DIFFERENT WAY TO SEE.';});
  addEventListener('pointerdown',prime,{passive:true});
  addEventListener('scroll',queue,{passive:true});
  addEventListener('resize',()=>{if(coarse&&width===innerWidth)return;width=innerWidth;queue();});
  document.addEventListener('visibilitychange',queue);
  addEventListener('pagehide',event=>{if(!event.persisted&&objectUrl)URL.revokeObjectURL(objectUrl);});
  queue();
})();
