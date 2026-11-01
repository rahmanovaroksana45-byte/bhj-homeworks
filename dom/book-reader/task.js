const book = document.getElementById('book');
const fontControls = Array.from(document.querySelectorAll('.font-size'));

fontControls.forEach((control) => {
  control.addEventListener('click', (event) => {
    // Отменяем стандартное поведение ссылки
    event.preventDefault();

    // Снимаем класс активности у всех кнопок размера
    fontControls.forEach((btn) => btn.classList.remove('font-size_active'));

    // Добавляем класс активности нажатой кнопке
    control.classList.add('font-size_active');

    // Удаляем предыдущие классы размера шрифта у книги
    book.classList.remove('book_fs-big', 'book_fs-small');

    // Считываем data-size (small, big или undefined для обычного)
    const size = control.dataset.size;

    if (size === 'big') {
      book.classList.add('book_fs-big');
    } else if (size === 'small') {
      book.classList.add('book_fs-small');
    }
  });
});
