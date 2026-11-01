const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

// 1. Загрузка случайного опроса (GET-запрос)
const xhrGet = new XMLHttpRequest();
xhrGet.open('GET', 'https://students.netoservices.ru/nestjs-backend/poll');
xhrGet.responseType = 'json';

xhrGet.addEventListener('load', () => {
  if (xhrGet.status >= 200 && xhrGet.status < 300) {
    const pollId = xhrGet.response.id;
    const { title, answers } = xhrGet.response.data;

    // Устанавливаем заголовок вопроса
    pollTitle.textContent = title;

    // Очищаем контейнер и создаём кнопки ответов
    pollAnswers.innerHTML = '';
    answers.forEach((answerText, index) => {
      const button = document.createElement('button');
      button.classList.add('poll__answer');
      button.textContent = answerText;

      // Обработка клика по ответу
      button.addEventListener('click', () => {
        alert('Спасибо, ваш голос засчитан!');
        sendVote(pollId, index);
      });

      pollAnswers.appendChild(button);
    });
  } else {
    console.error(`Ошибка загрузки опроса: ${xhrGet.status}`);
  }
});

xhrGet.addEventListener('error', () => {
  console.error('Сетевая ошибка при загрузке опроса');
});

xhrGet.send();

// 2. Отправка голоса и вывод статистики (POST-запрос, повышенный уровень)
function sendVote(pollId, answerIndex) {
  const xhrPost = new XMLHttpRequest();
  xhrPost.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
  xhrPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhrPost.responseType = 'json';

  xhrPost.addEventListener('load', () => {
    if (xhrPost.status >= 200 && xhrPost.status < 300) {
      const stat = xhrPost.response.stat;

      // Вычисляем общее количество голосов для расчёта процентов
      const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0);

      // Отрисовываем результаты
      pollAnswers.innerHTML = '';
      stat.forEach((item) => {
        const percent = totalVotes > 0 ? ((item.votes / totalVotes) * 100).toFixed(2) : 0;

        const statRow = document.createElement('div');
        statRow.style.margin = '8px 0';
        statRow.innerHTML = `
          <span>${item.answer}: </span>
          <strong>${percent}%</strong> (${item.votes} голосов)
        `;
        pollAnswers.appendChild(statRow);
      });
    } else {
      console.error(`Ошибка при отправке голоса: ${xhrPost.status}`);
    }
  });

  xhrPost.addEventListener('error', () => {
    console.error('Сетевая ошибка при отправке голоса');
  });

  xhrPost.send(`vote=${pollId}&answer=${answerIndex}`);
}
