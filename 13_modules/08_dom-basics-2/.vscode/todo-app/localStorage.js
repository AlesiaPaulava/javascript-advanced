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


