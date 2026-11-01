const form = document.getElementById('form');
const progress = document.getElementById('progress');
const fileInput = document.getElementById('file');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Проверяем, выбран ли файл перед отправкой
  if (!fileInput.files.length) {
    alert('Пожалуйста, выберите файл для загрузки');
    return;
  }

  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload');

  // Важно: отслеживаем событие progress именно у объекта upload
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      // e.loaded — сколько байт передано, e.total — общий вес файла
      progress.value = e.loaded / e.total;
    }
  });

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      alert('Файл успешно загружен!');
    } else {
      alert(`Ошибка загрузки: статус ${xhr.status}`);
    }
  });

  xhr.addEventListener('error', () => {
    alert('Произошла сетевая ошибка при отправке файла');
  });

  xhr.send(formData);
});
