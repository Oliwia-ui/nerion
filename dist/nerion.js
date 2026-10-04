const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function toggleMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('open', open); menu.inert = !open;
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) menu.querySelector('a').focus(); else menuButton.focus({preventScroll:true});
}
menuButton.addEventListener('click', () => toggleMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));
document.addEventListener('keydown', e => {
  if (menuButton.getAttribute('aria-expanded') !== 'true') return;
  if (e.key === 'Escape') toggleMenu(false);
  if (e.key === 'Tab') {
    const items = [menuButton, ...menu.querySelectorAll('a')];
    const index = items.indexOf(document.activeElement);
    e.preventDefault(); items[(index + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
  }
});
const features = {
  optic: ['CLARITY, BY DESIGN', 'A wide, uninterrupted view. An adaptive lens concept designed to make the unfamiliar feel a little more familiar.'],
  array: ['A SENSE OF YOUR SURROUNDINGS', 'Environmental sensors bring depth, water conditions and orientation into one connected perspective. More awareness, without another thing to hold.'],
  hud: ['INFORMATION. NOT INTERRUPTION.', 'An integrated display concept places essential dive information inside the visor. A quiet layer of intelligence, with the ocean always in focus.']
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectFeature(tab) {
  tabs.forEach(t => { t.setAttribute('aria-selected', String(t === tab)); t.tabIndex = t === tab ? 0 : -1; });
  const detail = document.querySelector('#feature-detail'); detail.setAttribute('aria-labelledby', tab.id);
  detail.querySelector('span').textContent = features[tab.dataset.feature][0];
  detail.querySelector('p').textContent = features[tab.dataset.feature][1];
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectFeature(tab));
  tab.addEventListener('keydown', e => {
    let next;
    if (e.key === 'ArrowRight') next = (i+1)%tabs.length;
    if (e.key === 'ArrowLeft') next = (i+tabs.length-1)%tabs.length;
    if (e.key === 'Home') next = 0; if (e.key === 'End') next = tabs.length-1;
    if (next !== undefined) {e.preventDefault();selectFeature(tabs[next]);tabs[next].focus();}
  });
});
const heroArt = document.querySelector('.hero-art'); const heroScene=document.querySelector('.hero'); let scrollQueued = false;
function updateScroll() {
  const progress = Math.min(1, scrollY / Math.max(1,document.documentElement.scrollHeight-innerHeight));
  const heroScroll=Math.max(0,-heroScene.getBoundingClientRect().top);
  document.querySelector('#depth-value').textContent = (progress*30).toFixed(1).padStart(4,'0');
  document.documentElement.style.setProperty('--progress', `${progress*100}%`);
  if (!reducedMotion && heroScroll < innerHeight) heroArt.style.transform = `translateY(${heroScroll*.14}px) rotate(${heroScroll*.002}deg)`;
  scrollQueued = false;
}
addEventListener('scroll', () => { if (!scrollQueued) {scrollQueued=true;requestAnimationFrame(updateScroll);} }, {passive:true}); updateScroll();
if (reducedMotion) document.querySelector('#mask-model').removeAttribute('auto-rotate');
// Ambient particles are rendered once by magic.js.
let audioContext, oceanGain, soundOn=false;
document.querySelector('#sound').addEventListener('click', async () => {
  const button=document.querySelector('#sound');
  try {
    if (!audioContext) {
      audioContext=new (window.AudioContext||window.webkitAudioContext)();
      const buffer=audioContext.createBuffer(1,audioContext.sampleRate*5,audioContext.sampleRate);
      const data=buffer.getChannelData(0);let last=0;
      for(let i=0;i<data.length;i++){last=(last+Math.random()*.04-.02)/1.02;data[i]=last*3.5;}
      const source=audioContext.createBufferSource();source.buffer=buffer;source.loop=true;
      const filter=audioContext.createBiquadFilter();filter.type='lowpass';filter.frequency.value=420;
      oceanGain=audioContext.createGain();oceanGain.gain.value=0;
      source.connect(filter);filter.connect(oceanGain);oceanGain.connect(audioContext.destination);source.start();
    }
    await audioContext.resume();soundOn=!soundOn;
    oceanGain.gain.setTargetAtTime(soundOn?.32:0,audioContext.currentTime,.5);
    button.setAttribute('aria-pressed',String(soundOn));button.setAttribute('aria-label',soundOn?'Disable ambient ocean sound':'Enable ambient ocean sound');
    document.querySelector('#sound-state').textContent=soundOn?'ON':'OFF';
  } catch { document.querySelector('#sound-state').textContent='UNAVAILABLE'; }
});
document.addEventListener('visibilitychange',()=>{if(audioContext){if(document.hidden)audioContext.suspend();else if(soundOn)audioContext.resume();}});
