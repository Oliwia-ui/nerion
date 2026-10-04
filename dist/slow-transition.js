(() => {
  const clamp = (value) => Math.max(0, Math.min(1, value));
  const background = document.querySelector('.hero-image');
  const png = document.querySelector('.mask-png');
  const model = document.querySelector('#hero-model');
  const hologram = document.querySelector('.hologram');
  const cards = document.querySelector('.hero-info');
  const label = document.querySelector('.shot-label');
  const cardItems = [...document.querySelectorAll('.info-card')];
  const updateSlowSequence = () => {
    const progress = clamp(window.scrollY / (window.innerHeight * 4.75));
    const scene = clamp(progress / 0.22);
    const information = clamp((progress - 0.29) / 0.18);
    const transition = clamp((progress - 0.60) / 0.38);
    const modelIn = clamp((transition - 0.20) / 0.68);
    background.style.opacity = String(scene * 0.84);
    background.style.transform = `scale(${1 + transition * 0.18})`;
    png.style.opacity = String(scene * (1 - transition));
    png.style.transform = `translate(${-50 - transition * 11}%,${transition * 3}%) scale(${1.08 + scene * 0.18 + transition * 1.85})`;
    png.style.filter = `drop-shadow(0 30px 60px #000c) blur(${transition * 6}px)`;
    model.style.opacity = String(modelIn);
    model.style.transform = `translateX(${32 - modelIn * 70}vw) scale(${0.82 + modelIn * 0.18})`;
    model.setAttribute('camera-orbit', `0deg 82deg ${3.2 - modelIn * 1.7}m`);
    model.setAttribute('orientation', `0deg ${modelIn * 180}deg 0deg`);
    model.setAttribute('field-of-view', `${31 - modelIn * 9}deg`);
    hologram.style.opacity = String(Math.min(1, scene * 1.5) * (1 - transition));
    cards.style.opacity = String(information * (1 - transition));
    cardItems.forEach((card, index) => {
      const side = index === 1 ? -1 : 1;
      card.style.transform = `translate(${side * transition * (90 + index * 30)}px,${-transition * (80 + index * 25)}px) rotate(${side * transition * 8}deg)`;
      card.style.filter = `blur(${transition * 6}px)`;
    });
    label.style.opacity = String(modelIn);
  };
  window.addEventListener('scroll', updateSlowSequence, { passive: true });
  updateSlowSequence();
})();
