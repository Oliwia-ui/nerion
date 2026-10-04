(() => {
  const model = document.querySelector('#hero-model');
  if (!model) return;
  const clamp = (value) => Math.max(0, Math.min(1, value));
  const move = () => {
    const hero = clamp(window.scrollY / (window.innerHeight * 3.95));
    const jump = clamp((hero - 0.63) / 0.25);
    const visible = clamp((jump - 0.22) / 0.62);
    // The actual 3D object crosses the frame: right -> centre -> left.
    model.style.transform = `translateX(${32 - visible * 70}vw) scale(${0.82 + visible * 0.18})`;
  };
  window.addEventListener('scroll', move, { passive: true });
  move();
})();
