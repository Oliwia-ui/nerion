const {readFileSync}=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
for(const reduced of [false,true]){
  let top=0,frame,now=0,fetches=0;
  const events={},media={},values={},letters=[];
  const video={dataset:{src:'opening.mp4'},duration:8,currentTime:0,seeking:false,
    addEventListener:(name,fn)=>media[name]=fn,load(){}};
  const stage={offsetHeight:1000,style:{setProperty:(key,value)=>values[key]=value}};
  const word={textContent:'Beyond',appendChild:node=>letters.push(node)};
  const section={offsetHeight:6000,getBoundingClientRect:()=>({top,bottom:top+6000}),
    querySelector:s=>s==='.opening-video'?video:s==='.abyss-stage'?stage:{setAttribute(){}},
    querySelectorAll:()=>[word]};
  vm.runInNewContext(readFileSync('dist/opening.js','utf8'),{
    document:{hidden:false,querySelector:()=>section,querySelectorAll:()=>[],
      createElement:()=>({style:{}}),documentElement:{classList:{toggle(){}}},addEventListener(){}},
    innerHeight:1000,innerWidth:1400,matchMedia:q=>({matches:q.includes('reduced-motion')&&reduced}),
    requestAnimationFrame:fn=>{frame=fn;return 1;},addEventListener:(name,fn)=>events[name]=fn,
    fetch:()=>{fetches++;return new Promise(()=>{});},URL:{}
  });
  function settle(){for(let i=0;i<200&&frame;i++){const fn=frame;frame=null;fn(now+=16.67);}}
  settle();assert.equal(values['--opening-gray'],reduced?0:1);
  if(reduced){assert.equal(fetches,0);assert(letters.every(l=>l.style.opacity===1));continue;}
  media.loadeddata();top=-3500;events.scroll();settle();
  assert.equal(values['--opening-gray'],0);assert(letters.every(l=>l.style.opacity===1));
  assert(video.currentTime>7);assert.equal(frame,null);
  video.seeking=true;const previous=video.currentTime;top=-1000;events.scroll();settle();
  assert.equal(video.currentTime,previous);video.seeking=false;media.seeked();
  assert(video.currentTime<3);assert.equal(values['--opening-gray'],1);
}
console.log('PASS opening color, letters, reverse seek, backpressure, idle and reduced motion');
