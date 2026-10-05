/* Pure scroll timeline: overlapping clips keep the outgoing image opaque
   until the incoming image covers it, avoiding a dip to black at each join. */
(() => {
  const clamp=n=>Math.max(0,Math.min(1,n));
  const smooth=n=>{n=clamp(n);return n*n*(3-2*n);};
  // Broader joins with longer scene holds: the dissolve does not steal reading time.
  const lengths=[5,3.2,4.6,4.6,4.6,5.4],overlap=1.15;
  let cursor=0;
  const segments=lengths.map((length,index)=>{
    const start=cursor;cursor+=length-(index<lengths.length-1?overlap:0);
    return {start,end:start+length,length};
  });
  const total=cursor;
  function seam(position){
    for(let i=1;i<segments.length;i++){
      const t=(position-segments[i].start)/overlap;
      if(t>0&&t<1)return Math.sin(Math.PI*t)**2;
    }
    return 0;
  }
  function sample(position){
    const p=Math.max(0,Math.min(total,position));
    return segments.map((s,i)=>{
      const local=clamp((p-s.start)/s.length);
      const active=p>=s.start&&p<=s.end;
      const opacity=!active?0:i===0?smooth(p/.4):smooth((p-s.start)/overlap);
      const enter=smooth((local-(i===0?.28:.13))/.27);
      const leave=i===segments.length-1?1:1-smooth((local-.76)/.2);
      return {local,opacity,copy:enter*leave,leave,
        time:i===0?clamp(local/.76):local,
        gray:i===0?1-smooth((local-.32)/.36):0};
    });
  }
  function letterPose(scene,index,count,local,leave){
    const order=scene===1?Math.abs(index-(count-1)/2)/Math.max(1,count/2):index/Math.max(1,count-1);
    const stagger=scene===0?(index%7)*.019:scene===5?0:order*.13;
    const enter=smooth((local-(scene===0?.28:.13)-stagger)/.25);
    const away=1-enter,exit=1-leave;
    let x=0,y=0,scale=1,rotate=0;
    if(scene===0)y=(away+exit)*(index%2?65:-65);
    if(scene===1){x=(index-(count-1)/2)*2.5*away;scale=1-.12*away;y=-exit*18;}
    if(scene===2){x=-55*away+exit*35;}
    if(scene===3){y=45*away-exit*25;rotate=-5*away;}
    if(scene===4){scale=1+.28*away;y=-14*away+exit*20;}
    if(scene===5)y=12*away;
    return {opacity:enter*leave,transform:`translate3d(${x}px,${y}px,0) rotate(${rotate}deg) scale(${scale})`};
  }
  const api={clamp,smooth,segments,total,overlap,sample,letterPose,seam};
  if(typeof module!=='undefined')module.exports=api;
  else window.NerionJourneyTimeline=api;
})();
