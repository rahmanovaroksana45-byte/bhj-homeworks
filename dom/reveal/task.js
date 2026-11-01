const reveals = document.querySelectorAll('.reveal');

function checkReveal() {
  const windowHeight = window.innerHeight;

  reveals.forEach((element) => {
    const rect = element.getBoundingClientRect();

    const isVisible = rect.top < windowHeight && rect.bottom > 0;

    if (isVisible) {
      element.classList.add('reveal_active');
    } else {
      element.classList.remove('reveal_active');
    }
  });
}

window.addEventListener('scroll', checkReveal);
checkReveal();
