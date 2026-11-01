const rotators = document.querySelectorAll('.rotator');

rotators.forEach((rotator) => {
  const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
  let currentIndex = cases.findIndex((item) => item.classList.contains('rotator__case_active'));

  if (currentIndex === -1) {
    currentIndex = 0;
    cases[0].classList.add('rotator__case_active');
  }

  // Применяем стартовый цвет первого активного элемента
  const initialColor = cases[currentIndex].dataset.color;
  if (initialColor) {
    cases[currentIndex].style.color = initialColor;
  }

  function rotate() {
    const currentCase = cases[currentIndex];
    currentCase.classList.remove('rotator__case_active');

    // Переход к следующему элементу по кругу
    currentIndex = (currentIndex + 1) % cases.length;
    const nextCase = cases[currentIndex];

    // Установка цвета из data-color (если задан)
    const nextColor = nextCase.dataset.color;
    if (nextColor) {
      nextCase.style.color = nextColor;
    }

    nextCase.classList.add('rotator__case_active');

    // Индивидуальная задержка из data-speed (или по умолчанию 1000мс)
    const speed = Number(nextCase.dataset.speed) || 1000;
    setTimeout(rotate, speed);
  }

  const initialSpeed = Number(cases[currentIndex].dataset.speed) || 1000;
  setTimeout(rotate, initialSpeed);
});
