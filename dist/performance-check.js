// Opt-in frame timing probe: open /?perf=1. No telemetry leaves this page.
if (new URLSearchParams(location.search).has('perf')) {
  const result = document.createElement('output');
  result.id = 'frame-timing';
  result.style.cssText='position:fixed;top:0;left:0;z-index:100;font:10px monospace;background:#000;color:#aff;padding:6px;pointer-events:none';
  result.textContent = 'Frame timing: warming up';
  document.body.append(result);
  setTimeout(() => {
    const times=[];let previous;
    function sample(now) {
      if(previous!==undefined)times.push(now-previous);previous=now;
      if(times.length<180){requestAnimationFrame(sample);return;}
      const sorted=times.sort((a,b)=>a-b);
      result.textContent=JSON.stringify({medianMs:+sorted[90].toFixed(1),p95Ms:+sorted[171].toFixed(1),framesOver25ms:times.filter(t=>t>25).length,total:180});
    }
    requestAnimationFrame(sample);
  },2000);
}
