let currentStorage = localStorage.getItem('storageType') || 'local';

export async function toggleStorage() {
  currentStorage = currentStorage === 'local' ? 'server' : 'local';
  localStorage.setItem('storageType', currentStorage);
  location.reload();
}

export { currentStorage };

export async function getTodoList(owner) {
  if (currentStorage === 'local') {
    const { getTodoList } = await import('./localStorage.js');
    return getTodoList(owner);
  } else {
    const { getTodoList } = await import('./api.js');
    return getTodoList(owner);
  }
}

export async function createTodoItem({ owner, name }) {
  if (currentStorage === 'local') {
    const { createTodoItem } = await import('./localStorage.js');
    return createTodoItem({ owner, name });
  } else {
    const { createTodoItem } = await import('./api.js');
    return createTodoItem({ owner, name });
  }
}

export async function switchTodoItemDone({ todoItem }) {
  if (currentStorage === 'local') {
    const { switchTodoItemDone } = await import('./localStorage.js');
    return switchTodoItemDone({ todoItem });
  } else {
    const { switchTodoItemDone } = await import('./api.js');
    return switchTodoItemDone({ todoItem });
  }
}

export async function deleteTodoItem({ element, todoItem }) {
  if (currentStorage === 'local') {
    const { deleteTodoItem } = await import('./localStorage.js');
    return deleteTodoItem({ element, todoItem });
  } else {
    const { deleteTodoItem } = await import('./api.js');
    return deleteTodoItem({ element, todoItem });
  }
}
