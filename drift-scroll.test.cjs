const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
(async()=>{for(const reduced of [false,true]){
  let top=0,observerCallback,frame;
  const events={},mediaEvents={},properties={};
  const video={dataset:{src:'assets/nerion-diver.mp4'},duration:8,currentTime:0,seeking:false,
    getAttribute:()=>null,load(){},addEventListener:(name,fn)=>mediaEvents[name]=fn};
  const viewport={offsetHeight:1000,style:{setProperty:(key,value)=>properties[key]=value}};
  const status={textContent:''};
  const section={offsetHeight:5000,getBoundingClientRect:()=>({top,bottom:top+5000}),
    querySelector:s=>s==='video'?video:s==='.drift-viewport'?viewport:status};
  vm.runInNewContext(readFileSync('dist/drift.js','utf8'),{
    document:{hidden:false,querySelector:()=>section,addEventListener(){}},innerHeight:1000,
    matchMedia:()=>({matches:reduced}),requestAnimationFrame:fn=>{frame=fn;return 1;},
    fetch:async()=>({ok:true,blob:async()=>({})}),URL:{createObjectURL:()=> 'blob:test-video'},
    addEventListener:(name,fn)=>events[name]=fn,
    IntersectionObserver:class{constructor(fn){observerCallback=fn;}observe(){}disconnect(){}}
  });
  const tick=()=>{const fn=frame;frame=null;fn?.();};
  await observerCallback([{isIntersecting:true}]);tick();
  if(reduced){assert.equal(video.src,undefined);console.log('PASS reduced motion keeps still poster');continue;}
  assert.equal(video.src,'blob:test-video');mediaEvents.loadeddata();tick();
  top=-2000;events.scroll();tick();assert(Math.abs(video.currentTime-3.975)<.001);
  video.seeking=true;top=-3000;events.scroll();tick();assert.equal(video.currentTime,3.975);
  video.seeking=false;mediaEvents.seeked();assert.equal(video.currentTime,5.9625);
  top=-1000;events.scroll();tick();assert.equal(video.currentTime,1.9875);
  assert.equal(frame,null);console.log('PASS forward/reverse seeking, seek backpressure, idle loop');
}})().catch(error=>{console.error(error);process.exitCode=1;});
