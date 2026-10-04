const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const {readFileSync}=require('node:fs');
const timeline=require('./dist/journey-timeline.js');
function setup(reduce=false,failMedia=false){
  let top=0,frame,now=0;const requests=[],events={},videos=[];
  function node(tag='div'){
    const classes=new Set();
    const n={tag,children:[],style:{setProperty(k,v){this[k]=v;}},events:{},textContent:'',
      classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c),toggle:(c,on)=>on?classes.add(c):classes.delete(c)},
      append(...items){this.children.push(...items);},replaceChildren(){this.children=[];},setAttribute(k,v){this[k]=v;},
      addEventListener(k,v){this.events[k]=v;},querySelectorAll(){return this.children.filter(n=>n.className==='journey-anchor');}};
    if(tag==='video'){Object.assign(n,{duration:8,currentTime:0,seeking:false,load(){},play:async()=>{},pause(){}});videos.push(n);}
    return n;
  }
  const original=node('video'),stage=node(),section=node(),root=node();
  stage.offsetHeight=1000;stage.querySelector=()=>original;
  section.offsetHeight=(timeline.total+1)*1000;
  section.getBoundingClientRect=()=>({top,bottom:top+section.offsetHeight});
  section.querySelector=()=>stage;
  vm.runInNewContext(readFileSync('dist/journey.js','utf8'),{
    document:{querySelector:()=>section,querySelectorAll:()=>[],createElement:node,documentElement:root,hidden:false,addEventListener(){}},
    window:{NerionJourneyTimeline:timeline},matchMedia:q=>({matches:q.includes('reduced-motion')&&reduce}),
    innerHeight:1000,innerWidth:1400,location:{hash:''},
    requestAnimationFrame:fn=>{frame=fn;return 1;},addEventListener:(name,fn)=>events[name]=fn,
    fetch:async src=>{requests.push(src);return {ok:!failMedia,blob:async()=>({})};},
    URL:{createObjectURL:()=> 'blob:test',revokeObjectURL(){}}
  });
  function settle(){for(let i=0;i<250&&frame;i++){const fn=frame;frame=null;fn(now+=16.67);}assert.equal(frame,null);}
  settle();
  return {requests,videos,stage,settle,scroll(position){top=-position*1000;events.scroll();settle();}};
}
test('player loads nearby clips only and coalesces forward/reverse seeks without an idle loop',async()=>{
  const p=setup();await new Promise(resolve=>setImmediate(resolve));
  assert.equal(p.requests.length,1);
  p.videos[0].events.loadeddata();p.settle();
  p.scroll(3);assert(p.requests.some(s=>s.includes('ripple')));
  p.scroll(8);await new Promise(resolve=>setImmediate(resolve));
  p.videos.forEach(v=>v.events.loadeddata?.());p.settle();
  const diver=p.videos[2];assert(diver.currentTime>4);
  diver.seeking=true;const before=diver.currentTime;p.scroll(7);assert.equal(diver.currentTime,before);
  diver.seeking=false;diver.events.seeked();assert(diver.currentTime<before);
  assert(!p.requests.some(s=>s.includes('light')),'Do not preload distant finale');
  p.scroll(timeline.total-.5);await new Promise(resolve=>setImmediate(resolve));
  p.videos[5].events.loadeddata();p.settle();assert(p.videos[5].currentTime>7);
});
test('reduced motion has six readable still scenes and makes no video requests',()=>{
  const p=setup(true);p.scroll(10);assert.equal(p.requests.length,0);
  assert.equal(p.stage.children.filter(n=>n.className==='journey-scene').length,6);
});
test('failed video fetch retains poster and HTML story without retrying every scroll',async()=>{
  const p=setup(false,true);await new Promise(resolve=>setImmediate(resolve));
  const scene=p.stage.children.find(n=>n.className==='journey-scene');
  assert(scene.classList.contains('still-only'));
  assert(scene.children.some(n=>n.className==='journey-media journey-poster'));
  assert(scene.children.some(n=>n.className==='journey-copy'));
  const before=p.requests.length;p.scroll(1);p.scroll(.5);
  assert.equal(p.requests.length,before);
});
