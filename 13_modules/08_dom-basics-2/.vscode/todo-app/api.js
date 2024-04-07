//получение скиска дел
export async function getTodoList(owner) {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
  return await response.json();
}

//создание дела на стороне сервера
export async function createTodoItem ({ owner, name }) {
  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    body: JSON.stringify({
      name,
      owner,
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return await response.json();
}

//отмечаем дело как сделанное или несделанное
export function switchTodoItemDone({ todoItem }) {
  todoItem.done = !todoItem.done;
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ done: todoItem.done }),
    headers: {
      'Content-Type': 'application/json',
    }
  });
}

//удаление дела
export function deleteTodoItem({ element, todoItem }) {
  if(!confirm('Вы уверены?')) {
    return;
  }
  element.remove();
  fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'DELETE',
  });
}
