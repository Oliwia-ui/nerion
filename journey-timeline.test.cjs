const assert=require('node:assert/strict');
const test=require('node:test');
const T=require('./dist/journey-timeline.js');
test('six distinct text entrances settle into an identical readable pose',()=>{
  const entrances=new Set();
  for(let scene=0;scene<6;scene++){
    entrances.add(T.letterPose(scene,3,20,.3,1).transform);
    const settled=T.letterPose(scene,3,20,.7,1);
    assert.equal(settled.opacity,1);
    assert.equal(settled.transform,'translate3d(0px,0px,0) rotate(0deg) scale(1)');
    assert.equal(T.letterPose(scene,3,20,.9,0).opacity,0);
  }
  assert.equal(entrances.size,6);
});
test('all five joins overlap without a black gap, forwards and backwards',()=>{
  for(const direction of [1,-1]){
    for(let step=0;step<=10000;step++){
      const p=(direction===1?step:10000-step)/10000*T.total;
      const states=T.sample(p);
      if(p>=.4)assert(states.some(s=>s.opacity>.999),'At least one underlying scene must be opaque');
      assert(states.filter(s=>s.opacity>0).length<=2,'Only two decoders are needed at a seam');
      states.forEach(s=>Object.values(s).forEach(n=>assert(Number.isFinite(n)&&n>=0&&n<=1)));
    }
  }
});
test('each join starts transparent and finishes opaque before the preceding scene disappears',()=>{
  T.segments.slice(1).forEach((segment,i)=>{
    assert.equal(T.sample(segment.start)[i+1].opacity,0);
    assert(T.sample(segment.start+T.overlap)[i+1].opacity>.999);
    assert.equal(T.sample(segment.start+T.overlap/2)[i].opacity,1);
  });
});
test('the opening keeps its original monochrome-to-color pacing and each scene gets a reading hold',()=>{
  assert.equal(T.sample(0)[0].gray,1);
  assert.equal(T.sample(3.5)[0].gray,0);
  T.segments.forEach((s,i)=>assert.equal(T.sample(s.start+s.length*.7)[i].copy,1));
  assert(Math.abs(T.sample(T.total)[5].time-1)<1e-9);
  assert.equal(T.sample(T.total)[5].copy,1);
});
