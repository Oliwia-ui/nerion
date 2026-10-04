(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const footer=document.querySelector('footer');
  const info=document.createElement('p');info.className='loop-instructions';
  info.textContent=reduced?'THE JOURNEY IS YOURS. RETURN WHEN YOU ARE READY.':'THE ABYSS AWAITS. PAUSE HERE, THEN SCROLL DOWN TO BEGIN AGAIN.';
  const button=document.createElement('button');button.className='loop-toggle';button.type='button';
  let enabled=!reduced,busy=false,bottomSince=0,lastWheel=0,amount=0,touchY=null,touchReady=false;
  button.textContent=enabled?'Scroll loop: on · turn off':'Scroll loop: off';button.setAttribute('aria-pressed',String(enabled));
  if(!reduced)button.addEventListener('click',()=>{enabled=!enabled;button.setAttribute('aria-pressed',String(enabled));button.textContent=enabled?'Scroll loop: on · turn off':'Scroll loop: off · turn on';});
  else button.hidden=true;
  footer.append(info,button);
  const curtain=document.createElement('div');curtain.className='loop-curtain';curtain.setAttribute('aria-hidden','true');document.body.append(curtain);
  const atBottom=()=>scrollY+innerHeight>=document.documentElement.scrollHeight-8;
  const editable=target=>Boolean(target?.closest?.('input,textarea,select,button,a,[contenteditable=true],model-viewer,[role=dialog]'));
  function read(){
    const bottom=atBottom();
    if(bottom&&!bottomSince)bottomSince=performance.now();
    if(!bottom){bottomSince=0;amount=0;}
    const dark=footer.getBoundingClientRect().bottom<innerHeight*1.4;
    document.documentElement.classList.toggle('loop-dark',dark);
  }
  function ready(){return enabled&&!busy&&atBottom()&&bottomSince&&performance.now()-bottomSince>600;}
  function restart(){
    if(!ready())return;busy=true;curtain.classList.add('is-covering');
    setTimeout(()=>{
      const root=document.documentElement,previous=root.style.scrollBehavior;root.style.scrollBehavior='auto';
      window.scrollTo({top:0,behavior:'instant'});history.replaceState(null,'',location.pathname+location.search+'#abyss');
      document.activeElement?.blur?.();root.classList.remove('loop-dark');
      setTimeout(()=>{root.style.scrollBehavior=previous;curtain.classList.remove('is-covering');busy=false;bottomSince=0;amount=0;},450);
    },360);
  }
  addEventListener('scroll',read,{passive:true});addEventListener('resize',read);
  addEventListener('wheel',event=>{
    if(busy){event.preventDefault();return;}
    const now=performance.now(),pause=now-lastWheel>250;lastWheel=now;
    if(!ready()||event.ctrlKey||editable(event.target)||event.deltaY<=0){amount=0;return;}
    if(pause)amount=1; // Only a fresh gesture after resting at the bottom can arm the loop.
    if(amount){amount+=Math.min(100,event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1));if(amount>100)restart();}
  },{passive:false});
  addEventListener('touchmove',event=>{if(busy)event.preventDefault();},{passive:false});
  addEventListener('touchstart',event=>{touchReady=ready()&&!editable(event.target);touchY=event.touches[0]?.clientY;},{passive:true});
  addEventListener('touchend',event=>{if(touchReady&&touchY-event.changedTouches[0]?.clientY>80)restart();touchReady=false;},{passive:true});
  addEventListener('keydown',event=>{if(!event.repeat&&!event.shiftKey&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!editable(event.target)&&['ArrowDown','PageDown',' '].includes(event.key)&&ready()){event.preventDefault();restart();}});
  read();
})();
