const itemsContainer = document.getElementById('items');
const loader = document.getElementById('loader');
const storageKey = 'currency_rates_cache';

// Функция отрисовки списка валют
function renderCurrencies(valutes) {
  let html = '';

  for (const code in valutes) {
    if (Object.prototype.hasOwnProperty.call(valutes, code)) {
      const item = valutes[code];
      html += `
        <div class="item">
          <div class="item__code">${item.CharCode}</div>
          <div class="item__value">${item.Value}</div>
          <div class="item__currency">руб.</div>
        </div>
      `;
    }
  }

  itemsContainer.innerHTML = html;
}

// 1. Повышенный уровень сложности: чтение из кэша (localStorage)
const cachedData = localStorage.getItem(storageKey);
if (cachedData) {
  try {
    const parsedCache = JSON.parse(cachedData);
    renderCurrencies(parsedCache);
    loader.classList.remove('loader_active');
  } catch (err) {
    console.error('Ошибка чтения кэша:', err);
  }
}

// 2. Отправка GET-запроса через XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.responseType = 'json';

xhr.addEventListener('load', () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    const valutes = xhr.response?.response?.Valute;

    if (valutes) {
      renderCurrencies(valutes);

      // Сохраняем свежие данные в localStorage
      localStorage.setItem(storageKey, JSON.stringify(valutes));
    }
  } else {
    console.error(`Ошибка загрузки: статус ${xhr.status}`);
  }

  // Скрываем анимацию загрузки после завершения запроса
  loader.classList.remove('loader_active');
});

xhr.addEventListener('error', () => {
  console.error('Сетевая ошибка при запросе курсов валют');
  loader.classList.remove('loader_active');
});

xhr.send();
