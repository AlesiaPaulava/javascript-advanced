//задание 1
const btn = document.querySelector('.btn');
const menu = document.querySelector('.dropdown-menu');

btn.addEventListener('click', () => {
  menu.classList.toggle('block');
})

document.addEventListener('click', (event) => {
  const clickedInside = menu.contains(event.target);
  const toggleButton = btn.contains(event.target);
  if (!clickedInside && !toggleButton) {
    menu.classList.remove('block');
  }
})

//задание 2

const form = document.getElementById('myForm');
const result = document.getElementById('result');
const inputs = document.querySelectorAll('input[type="text"]');

inputs.forEach(input => {
  input.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    const valid = /^[а-яА-Я\s-]*$/; //выражение для допустимых символов

    if (!valid.test(inputValue)) {
      event.target.value = inputValue.slice(0, -1); // Удаление последнего введенный символа, если он недопустимый
    }
  })

  input.addEventListener('blur', (event) => {
    let inputValue = event.target.value.trim(); // Удаление пробелов в начале и конце значения

    // Удаление пробелов и дефисов в начале и конце значения
    inputValue = inputValue.replace(/^[\s-]+|[\s-]+$/g, '');

    // Удаление всех символов, кроме допустимых (кириллицы, дефиса и пробела)
    inputValue = inputValue.replace(/[^а-яА-Я\s-]/g, '');

    // Замена нескольких идущих подряд пробелов на один
    inputValue = inputValue.replace(/\s{2,}/g, ' ');

    // Замена нескольких идущих подряд дефисов на один
    inputValue = inputValue.replace(/-{2,}/g, '-');

    // Первая буква к верхнему регистру, а все остальные к нижнему
    inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase();

    // Устанавливаем скорректированное значение обратно в поле ввода
    event.target.value = inputValue;
  });
})

//Отправка формы
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Предотвращаем перезагрузку страницы
  const name = form.inputName.value;
  const lastName = form.inputLastName.value;
  const patronymic = form.inputPatronymic.value;
  const fullName = `${lastName} ${name} ${patronymic}`;
  addParagraph(fullName);
  form.reset(); // очистка формы
});

// добавление абзаца с данными
function addParagraph(text) {
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  result.append(paragraph);
}
