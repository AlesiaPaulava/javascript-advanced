// import * as storage from './storage.js'; // импортируем модуль для работы с хранилищем
//создаем и возврацаем заголовок приложения
export function createAppTitle(title) {
  let appTitle = document.createElement('h2'); //создаём элемент h2
  appTitle.innerHTML = title; //присваеваем внутрь элемента title
  return appTitle; //возвращаем обязательно созданный элемент, т.к.он будет помещаться внутрь дива
}

//создаем и возврацаем форму для создания дела
export function createTodoItemForm() {
  let form = document.createElement('form'); //создаем элемент формы
  let input = document.createElement('input');//создаем поле для ввода
  let buttonWrapper = document.createElement('div'); //передаем вспомогательный элемент для стилизации кнопки
  let button = document.createElement('button'); //создаем кнопку

  form.classList.add('input-group', 'mb-3'); //для формы устанавливаем два класса по бутстрап
  input.classList.add('form-control'); //для поля для ввода устанавливаем класс по бутстрап
  input.placeholder = 'Введите название нового дела'; //добавим плейсхолдер в поле для ввода
  buttonWrapper.classList.add('input-group-append'); //для дива кнопки добавляем класс бутстрап(для позицианировнаия элем-та в форме справа от нашего поля для воода)
  button.classList.add('btn', 'btn-primary'); //добавляем кнопке классы бутстрапа (стили для кнопок и цвет)
  button.textContent = 'Добавить дело'; //добавим текст для кнопки
  button.disabled = true;

  //объединяем элементы в единую структуру
  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  //Событие, которое реагирует на ввод данных. Делает активной кнопку.
  input.addEventListener('input', function () {
    if (input.value !== "") {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

  return {
    form,
    input,
    button
  };
}

//создаем и возврацаем список элементов
export function createTodoList() {
  let list = document.createElement('ul'); //создаем ненумерованный список
  list.classList.add('list-group'); //добавляем списку класс бутстрап
  return list;
}

//функция, которая создает ДОМэлемент с делом
export function createTodoItemElement(todoItem, { onDone, onDelete }) {

  let item = document.createElement('li');
  //кнопки помещаем в элемент, который красиво покажет их в одной группе
  let buttonGroup = document.createElement('div'); //для красивого размещения кнопок
  let doneButton = document.createElement('button'); //кнопка, отметить дело как сделанное
  let deleteButton = document.createElement('button'); //кнопка, удалить дело из списка

  //устанавливаем стили для элементов списка, а так же для размещения кнопок
  //в его правой части с помощью flex
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  if (todoItem.done == true) item.classList.add('list-group-item-success');
  item.textContent = todoItem.name; //именно textContent, а не HTML т.к.могут быть спецсимволы внутри

  buttonGroup.classList.add('btn-group', 'btn-group-sm'); //добавляем класс для стилизации
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  //добавляем обработчики на кнопки
  doneButton.addEventListener('click', () => {
    onDone({ todoItem, element: item });
    item.classList.toggle('list-group-item-success', todoItem.done); //добавляем или убираем класс бутстрап, который красит в зеленый
  });

  deleteButton.addEventListener('click', () => {
    onDelete({ todoItem, element: item });
  });

  //вкладываем кнопки в отдельный элемент, что бы они объединились в один блок
  buttonGroup.append(doneButton); //кнопку вкладываем в общий блок
  buttonGroup.append(deleteButton); //кнопку вкладываем в общий блок
  item.append(buttonGroup); //группу гнопок вкладываем в li

  //приложению нужен доступ к самому элементу и кнопкам, чтоюы обрабатывать события нажатия
  return item;
}


export async function createTodoApp(container, {
  title = 'Список дел',
  owner,
  todoItemList = [],
  onCreateFormSubmit,
  onDoneClick,
  onDeleteClick,
}) {
  //вызываем три функции созданные выше
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();
  const handlers = { onDone: onDoneClick, onDelete: onDeleteClick };

  //результат вызываемых функуий добавляем в контейнер
  container.append(todoAppTitle); //вернет элемент h2
  container.append(todoItemForm.form); //возвращаем объект в котором помимо прочего есть form, поэтому вызываем св-во form
  container.append(todoList); //вернет элемент ul

  //проходим по массиву при запуске приложения
  todoItemList.forEach(todoItem => { //в itemList будет храниться объект из localStorage
    //помещаем в переменную список ранее созданных дел
    const todoItemElement = createTodoItemElement(todoItem, handlers);
    //создаем и добавляем в список новое дело с названием из поля ввода
    todoList.append(todoItemElement);
  })

  //браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
  todoItemForm.form.addEventListener('submit', async e => {
    //эта строчка необходима, чтобы предоставить стандартное действие браузера
    //в данном случе мы не хотим, чтобы страница перезагружалась при отправке формы
    e.preventDefault();

    //игнорируем создание элемента, если пользователь ни чего не ввёл в поле
    if (!todoItemForm.input.value) {
      return;
    };

    const todoItem = await onCreateFormSubmit({
      owner,
      name: todoItemForm.input.value.trim(),
    });

    let todoItemElement = createTodoItemElement(todoItem, handlers); //помещаем в переменную список нового дела с названием из поля для ввода

    todoList.append(todoItemElement);
    //деактивируем кнопку после добавления дела в список
    todoItemForm.button.disabled = true;
    //обнуляем значение в поле, чтобы не пришлось стирать его вручную
    todoItemForm.input.value = '';
  });
}

// // Создание кнопки для переключения хранилища
// export function createButton(container) {
//   const button = document.createElement('button');
//   button.classList.add('btn', 'btn-primary');
//   button.textContent = storage.currentStorage === 'local' ? 'Перейти на серверное хранилище' : 'Перейти на локальное хранилище';
//   button.addEventListener('click', storage.toggleStorage); // добавляем обработчик клика для переключения хранилища
//   container.appendChild(button);
//   return button;
// }

// export async function runTodoApp(title, owner) {
//   loadLocal(title, owner);
//   const container = document.querySelector('#button-container');
//   let button = document.createElement('button');
//   button.classList.add('btn', 'btn-primary');
//   button.textContent = 'Перейти на серверное хранилище';
//   button.dataset.from = 'local';
//   button.addEventListener('click', () => {
//     document.getElementById('todo-app').innerText = '';
//     if (button.dataset.from === 'local') {
//       button.dataset.from = 'api';
//       button.textContent = 'Перейти на локальное хранилище';
//       loadApi(title, owner);
//     } else {
//       button.dataset.from = 'local';
//       button.textContent = 'Перейти на серверное хранилище';
//       loadLocal(title, owner);
//     }
//   });
//   container.append(button);
// }
// //создание кнопки
export function createButton(container, switchStorage) {
  // Создаем кнопку
  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary');
  button.style = 'margin-bottom: 25px';

  // Устанавливаем начальный текст кнопки
  button.textContent = 'Перейти на серверное хранилище';

  // Добавляем обработчик события клика
  button.addEventListener('click', function () {
    // Проверяем текущий текст кнопки и меняем его на противоположный
    if (button.textContent === 'Перейти на локальное хранилище') {
      button.textContent = 'Перейти на серверное хранилище';
      switchStorage();
    } else {
      button.textContent = 'Перейти на локальное хранилище';
      switchStorage();
    }
  });

  container.append(button);

  return button;
}



// //функция, которая создает ДОМэлемент с делом
// export function createTodoItem(obj) {
//   let item = document.createElement('li');
//   //кнопки помещаем в элемент, который красиво покажет их в одной группе
//   let buttonGroup = document.createElement('div'); //для красивого размещения кнопок
//   let doneButton = document.createElement('button'); //кнопка, отметить дело как сделанное
//   let deleteButton = document.createElement('button'); //кнопка, удалить дело из списка

//   //устанавливаем стили для элементов списка, а так же для размещения кнопок
//   //в его правой части с помощью flex
//   item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
//   item.textContent = obj.name; //именно textContent, а не HTML т.к.могут быть спецсимволы внутри

//   buttonGroup.classList.add('btn-group', 'btn-group-sm'); //добавляем класс для стилизации
//   doneButton.classList.add('btn', 'btn-success');
//   doneButton.textContent = 'Готово';
//   deleteButton.classList.add('btn', 'btn-danger');
//   deleteButton.textContent = 'Удалить';

//   if (obj.done == true) item.classList.add('list-group-item-success');

//   //добавляем обработчики на кнопки
//   doneButton.addEventListener('click', function () {
//     item.classList.toggle('list-group-item-success'); //добавляем или убираем класс бутстрап, который красит в зеленый

//     for (const listItem of listArray) { //проходимся циклом по массиву дел
//       if (listItem.id == obj.id) listItem.done = !listItem.done //если ID дела в массиве равен ID добавленного дела по которому кликнули, то done меняет на противоположное
//     }
//     //сохраняем в localStorage массив в виде строки
//     saveList(listArray, listName);
//   });

//   deleteButton.addEventListener('click', function () {
//     if (confirm('Вы уверены?')) { //вернет true если человек нажмет ДА
//       item.remove(); //удалит элемент
//       for (let i = 0; i < listArray.length; i++) { //проходимся по каждому объекту массива
//         if (listArray[i].id == obj.id) listArray.splice(i, 1); //при нажатии на кнопку удалить, удаленное дело удаляется из массива
//       }
//       //сохраняем в localStorage массив в виде строки
//       saveList(listArray, listName);
//     }
//   });

//   //вкладываем кнопки в отдельный элемент, что бы они объединились в один блок
//   buttonGroup.append(doneButton); //кнопку вкладываем в общий блок
//   buttonGroup.append(deleteButton); //кнопку вкладываем в общий блок
//   item.append(buttonGroup); //группу гнопок вкладываем в li

//   //приложению нужен доступ к самому элементу и кнопкам, чтоюы обрабатывать события нажатия
//   return {
//     item,
//     doneButton,
//     deleteButton,
//   };
// }




