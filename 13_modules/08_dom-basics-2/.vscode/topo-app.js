
// //пустой массив дел, сюда будут сохраняться созданные дела
// let listArray = [],
//   listName = ''

// //создаем и возврацаем заголовок приложения
// function createAppTitle(title) {
//   let appTitle = document.createElement('h2'); //создаём элемент h2
//   appTitle.innerHTML = title; //присваеваем внутрь элемента title
//   return appTitle; //возвращаем обязательно созданный элемент, т.к.он будет помещаться внутрь дива
// }

// //создаем и возврацаем форму для создания дела
// function createTodoItemForm() {
//   let form = document.createElement('form'); //создаем элемент формы
//   let input = document.createElement('input');//создаем поле для ввода
//   let buttonWrapper = document.createElement('div'); //передаем вспомогательный элемент для стилизации кнопки
//   let button = document.createElement('button'); //создаем кнопку

//   form.classList.add('input-group', 'mb-3'); //для формы устанавливаем два класса по бутстрап
//   input.classList.add('form-control'); //для поля для ввода устанавливаем класс по бутстрап
//   input.placeholder = 'Введите название нового дела'; //добавим плейсхолдер в поле для ввода
//   buttonWrapper.classList.add('input-group-append'); //для дива кнопки добавляем класс бутстрап(для позицианировнаия элем-та в форме справа от нашего поля для воода)
//   button.classList.add('btn', 'btn-primary'); //добавляем кнопке классы бутстрапа (стили для кнопок и цвет)
//   button.textContent = 'Добавить дело'; //добавим текст для кнопки
//   button.disabled = true;

//   //объединяем элементы в единую структуру
//   buttonWrapper.append(button);
//   form.append(input);
//   form.append(buttonWrapper);

//   //Событие, которое реагирует на ввод данных. Делает активной кнопку.
//   input.addEventListener('input', function () {
//     if (input.value !== "") {
//       button.disabled = false;
//     } else {
//       button.disabled = true;
//     }
//   });

//   //Получилася такой код
//   //<form class="input-group, mb-3">
//   //  <input class="form-control" placeholder="Введите название нового дела">
//   //  <div class="input-group-append">
//   //    <button class="btn, btn-primary">Добавить дело</button>
//   //  </div>
//   //</form>

//   return {
//     form,
//     input,
//     button
//   };
// }

// //создаем и возврацаем список элементов
// function createTodoList() {
//   let list = document.createElement('ul'); //создаем ненумерованный список
//   list.classList.add('list-group'); //добавляем списку класс бутстрап
//   return list;
// }

// //функция, которая создает ДОМэлемент с делом
// function createTodoItem(obj) {
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

// //функция для генерации уникальных чисел id
// function getNewID(arr) {
//   let max = 0;
//   for (const item of arr) {
//     if (item.id > max) max = item.id; //данный цикл ищет максимальное число в id и после этого цикла max будет максимальным числом
//   }
//   return max + 1;
// }

// //функция для сохранения в localStorage
// function saveList(arr, listKey) {
//   localStorage.setItem(listKey, JSON.stringify(arr)); //записывает массив в виде строки в localStorage
// }

// function createTodoApp(container, title = 'Список дел', listKey) { //listKey отвечает за сохранение дел для каждого пользователя


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

// //регистируем функцию createTodoApp в глобальном объекте window чтобы получить доступ к этой
// //функции из других скриптов
// export { createTodoApp };



