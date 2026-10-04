(() => {
  if(document.documentElement?.classList.contains('film-journey'))return;
  const section=document.querySelector('#drift');
  const viewport=section.querySelector('.drift-viewport');
  const video=section.querySelector('video');
  const status=section.querySelector('.drift-status');
  const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  let visible=false,loaded=false,frame=0,targetTime=0;
  const clamp=n=>Math.min(1,Math.max(0,n));
  // Short GOPs in the local video keep backwards and forwards seeking cheap.
  // Never queue overlapping seeks or an endless animation loop.
  function seek(){
    if(!visible||document.hidden||reduced||!loaded||video.seeking)return;
    if(Math.abs(video.currentTime-targetTime)>1/30)video.currentTime=targetTime;
  }
  function update(){
    frame=0;
    const rect=section.getBoundingClientRect();
    visible=rect.bottom>0&&rect.top<innerHeight;
    if(!visible)return;
    const progress=clamp(-rect.top/Math.max(1,section.offsetHeight-viewport.offsetHeight));
    viewport.style.setProperty('--drift-progress',progress);
    viewport.style.setProperty('--drift-copy',1-clamp(progress/.3));
    if(loaded){targetTime=progress*Math.max(0,video.duration-.05);seek();}
  }
  function queue(){if(!frame)frame=requestAnimationFrame(update);}
  video.addEventListener('loadeddata',()=>{loaded=true;queue();});
  video.addEventListener('seeked',seek);
  video.addEventListener('error',()=>{status.textContent='CONCEPT STILL · CONTINUE SCROLLING ↓';});
  let requested=false,objectUrl;
  const observer=new IntersectionObserver(async entries=>{
    if(!entries.some(entry=>entry.isIntersecting)||requested||reduced)return;
    requested=true;observer.disconnect();
    try{
      // A local blob remains seekable even on static servers without Range support.
      const response=await fetch(video.dataset.src);
      if(!response.ok)throw new Error('Video unavailable');
      objectUrl=URL.createObjectURL(await response.blob());
      video.src=objectUrl;video.preload='auto';video.load();
    }catch{status.textContent='CONCEPT STILL · CONTINUE SCROLLING ↓';}
  },{rootMargin:'100% 0px'});
  observer.observe(section);
  addEventListener('scroll',queue,{passive:true});
  addEventListener('resize',queue);
  document.addEventListener('visibilitychange',queue);
  if(reduced)status.textContent='CONCEPT STILL · CONTINUE SCROLLING ↓';
  queue();
})();
