// import { createAppTitle, createTodoItemForm, createTodoList, createTodoItem } from './view.js';
//пустой массив дел, сюда будут сохраняться созданные дела
export let listArray = [],
  listName = ''

//функция для генерации уникальных чисел id
function getNewID(arr) {
  let max = 0;
  for (const item of arr) {
    if (item.id > max) max = item.id; //данный цикл ищет максимальное число в id и после этого цикла max будет максимальным числом
  }
  return max + 1;
}

//функция для сохранения в localStorage
export function saveList(arr, listKey) {
  localStorage.setItem(listKey, JSON.stringify(arr)); //записывает массив в виде строки в localStorage
}

export function getTodoList(owner) {
  listName = owner;
  const localData = localStorage.getItem(listName);
  if (localData !== null && localData !== '') {
    listArray = JSON.parse(localData);
  }
  return listArray;
}

export function createTodoItem({ owner, name }) {
  let newItem = {
    id: getNewID(listArray),
    name,
    done: false,
  };
  listArray.push(newItem);
  saveList(listArray, owner);
  return newItem;
}

export function switchTodoItemDone({ todoItem }) {
  const index = listArray.findIndex(item => item.id === todoItem.id);
  if (index !== -1) {
    listArray[index].done = !listArray[index].done;
    saveList(listArray, listName);
  }
}

export function deleteTodoItem({ element, todoItem }) {
  if (confirm('Вы уверены?')) {
    const index = listArray.findIndex(item => item.id === todoItem.id);
    if (index !== -1) {
      listArray.splice(index, 1);
      saveList(listArray, listName);
      element.remove();
    }
  }
}

// export function createTodoApp(container,
//   title = 'Список дел',
//   listKey,) { //listKey отвечает за сохранение дел для каждого пользователя
//   //вызываем три функции созданные выше
//   let todoAppTitle = createAppTitle(title);
//   let todoItemForm = createTodoItemForm();
//   let todoList = createTodoList();

//   listName = listKey; //помещаем в глобальную переменную имя списка listKey, что бы имя скиска было везде доступно

//   //результат вызываемых функуий добавляем в контейнер
//   container.append(todoAppTitle); //вернет элемент h2
//   container.append(todoItemForm.form); //возвращаем объект в котором помимо прочего есть form, поэтому вызываем св-во form
//   container.append(todoList); //вернет элемент ul

//   //при первом запуске приложения расшифровываем массив
//   let localData = localStorage.getItem(listName); //получаем массив в виде строки из localStorage по ключу listName
//   //проверка на пустоту, т.к. при первом запуске localStorage пустой
//   if (localData !== null && localData !== '') { //если в localStorage не пусто и не равно пустой строчке
//     listArray = JSON.parse(localData) //первращаем строчку обратно в массив
//   }

//   //проходим по массиву при запуске приложения
//   for (const itemList of listArray) { //в itemList будет храниться объект из localStorage
//     //помещаем в переменную список ранее созданных дел
//     let todoItem = createTodoItem(itemList);
//     //создаем и добавляем в список новое дело с названием из поля ввода
//     todoList.append(todoItem.item);
//   }

//   //браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
//   todoItemForm.form.addEventListener('submit', function (e) {
//     //эта строчка необходима, чтобы предоставить стандартное действие браузера
//     //в данном случе мы не хотим, чтобы страница перезагружалась при отправке формы
//     e.preventDefault();

//     //игнорируем создание элемента, если пользователь ни чего не ввёл в поле
//     if (!todoItemForm.input.value) {
//       return;
//     };

//     //создаём переменную, которая будет добавляться в массив listArray
//     let newItem = {
//       id: getNewID(listArray),
//       name: todoItemForm.input.value,
//       done: false,
//     }

//     let todoItem = createTodoItem(newItem); //помещаем в переменную список нового дела с названием из поля для ввода

//     //добавляем в пустой массив listArray новое дело
//     listArray.push(newItem);
//     //сохраняем в localStorage массив в виде строки,
//     saveList(listArray, listName);
//     //создаем и добавляем в список новое дело с названием из поля ввода
//     todoList.append(todoItem.item);
//     //деактивируем кнопку после добавления дела в список
//     todoItemForm.button.disabled = true;
//     //обнуляем значение в поле, чтобы не пришлось стирать его вручную
//     todoItemForm.input.value = '';
//   });
// }

// //создание кнопки
// export function createButton(container) {
//   // Создаем кнопку
//   const button = document.createElement('button');
//   button.classList.add('btn', 'btn-primary');
//   button.style = 'margin-bottom: 25px';

//   // Устанавливаем начальный текст кнопки
//   button.textContent = 'Перейти на локальное хранилище';

//   // Добавляем обработчик события клика
//   button.addEventListener('click', function () {
//     // Проверяем текущий текст кнопки и меняем его на противоположный
//     if (button.textContent === 'Перейти на локальное хранилище') {
//       button.textContent = 'Перейти на серверное хранилище';
//       // Ваш код для переключения на серверное хранилище
//     } else {
//       button.textContent = 'Перейти на локальное хранилище';
//       // Ваш код для переключения на локальное хранилище
//     }
//   });

//   container.append(button);

//   return button;
// }


