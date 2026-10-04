const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const {readFileSync}=require('node:fs');
function setup(reduced=false){
 let now=1000,y=0,resets=0;const events={},timers=[],nodes=[];
 const element=()=>({style:{},classList:{add(){},remove(){},toggle(){}},setAttribute(){},append(){},addEventListener(){}});
 const root=element();root.scrollHeight=10000;
 const footer={append(){},getBoundingClientRect:()=>({bottom:10000-y})};
 const context={matchMedia:()=>({matches:reduced}),document:{querySelector:()=>footer,createElement:()=>{const n=element();nodes.push(n);return n;},documentElement:root,body:element(),activeElement:{blur(){}}},
 innerHeight:1000,performance:{now:()=>now},addEventListener:(k,fn)=>events[k]=fn,setTimeout:fn=>timers.push(fn),history:{replaceState(){}},location:{pathname:'/',search:''},window:{scrollTo(){resets++;y=0;}}};
 Object.defineProperty(context,'scrollY',{get:()=>y});vm.runInNewContext(readFileSync('dist/scroll-loop.js','utf8'),context);
 return {events,timers,get resets(){return resets;},bottom(){y=9000;events.scroll();},time(n){now+=n;},wheel(delta=130){events.wheel({deltaY:delta,deltaMode:0,target:null,preventDefault(){}});}};
}
test('arrival and momentum do not loop; a fresh gesture after resting does',()=>{
 const p=setup();p.bottom();p.wheel();assert.equal(p.timers.length,0);
 for(let i=0;i<8;i++){p.time(100);p.wheel();}assert.equal(p.timers.length,0);
 p.time(400);p.wheel();assert.equal(p.timers.length,1);p.timers.shift()();assert.equal(p.resets,1);
 p.wheel();assert.equal(p.resets,1);
});
test('reduced motion and upward gestures never trigger a reset',()=>{
 const p=setup(true);p.bottom();p.time(1000);p.wheel();assert.equal(p.timers.length,0);
 const normal=setup();normal.bottom();normal.time(1000);normal.wheel(-300);assert.equal(normal.timers.length,0);
});
