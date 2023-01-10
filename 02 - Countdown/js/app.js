const countDownElement = document.querySelector('.countdown');
const items = document.querySelectorAll('.countdown-item > h4');

//Назначем время
const countDownDate = new Date(2023, 04, 18, 10, 0, 0).getTime();

function getCountDownTime() {
  //Получаем актуальную дату
  const now = new Date().getTime();

  //Получаем разницу
  const distance = countDownDate - now;

  //1c === 1000мс
  //1м === 60с
  //1ч === 60м
  //1с === 24часа

  //Создаем переменные в мс
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;

  //Подсчёт дней , часов , минуты и секунды
  let days = Math.floor(distance / day);
  let hours = Math.floor((distance % day) / hour);
  let minutes = Math.floor((distance % hour) / minute);
  let seconds = Math.floor((distance % minute) / 1000);

  const values = [days, hours, minutes, seconds];

  items.forEach((item, index) => {
    item.textContent = values[index];
  });

  if (distance < 0) {
    clearInterval(countTime);
    countDownElement.innerHTML = '<h2>Старт уже начался</h2>';
  }
}

let countTime = setInterval(getCountDownTime, 1000);

getCountDownTime();
