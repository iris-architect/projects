window.addEventListener('load', () => {
  // Показ SVG-фона
  document.body.classList.add('loaded');

  // Карусель
  const slider = document.getElementById('slider');
  if (!slider) return;

  const slides = slider.children.length;
  let index = 0;
  let interval;

  function visibleSlides() {
    return window.innerWidth < 768 ? 1 : 3;
  }

  function slideWidth() {
    return 100 / visibleSlides();
  }

  function move() {
    index++;
    slider.style.transition = 'transform 0.7s ease-out';
    slider.style.transform = `translateX(-${index * slideWidth()}%)`;

    const maxIndex = slides - visibleSlides();

    if (index === maxIndex) {
      setTimeout(() => {
        slider.style.transition = 'none';
        index = 0;
        slider.style.transform = 'translateX(0)';
      }, 700);
    }
  }

  function start() {
    interval = setInterval(move, 2000);
  }

  slider.addEventListener('mouseenter', () => clearInterval(interval));
  slider.addEventListener('mouseleave', start);

  start();
});
