window.addEventListener('load', () => {

  // Загружаем SVG-файлы
  document.body.classList.add('loaded');

  //Работа с каруселью скриншотов
  const slider = document.getElementById('slider');
  if (!slider) return;

  const slides = slider.children.length;
  let index = 0;
  let interval;

  //Определяем количество слайдов для разных экранов
  function visibleSlides() {
    const w = window.innerWidth;

    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  }

  //Вычисление ширины слайда относительно контейнера
  function slideWidth() {
    return 100 / visibleSlides();
  }

  //Прокручивание скриншотов
  function move() {
    index++;
    slider.style.transition = 'transform 0.7s ease-out';
    slider.style.transform = `translateX(-${index * slideWidth()}%)`;

    const maxIndex = slides - visibleSlides();

    if (index >= maxIndex) {
      setTimeout(() => {
        slider.style.transition = 'none';
        index = 0;
        slider.style.transform = 'translateX(0)';
      }, 700);
    }
  }

  //Запуск прокрутки с интервалом в 2 секунды
  function start() {
    interval = setInterval(move, 2000);
  }

  //При наведении на карусель - останавливаем
  slider.addEventListener('mouseenter', () => clearInterval(interval));
  slider.addEventListener('mouseleave', start);

  //При изменении размера окна - пересчитываем и сбрасываем карусель
  window.addEventListener('resize', () => {
    slider.style.transition = 'none';
    index = 0;
    slider.style.transform = 'translateX(0)';
  });

  start();
});
