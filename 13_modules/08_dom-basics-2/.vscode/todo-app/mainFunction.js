import { createTodoApp, createButton } from "./view.js";

export async function mainFunction() {
  let localStorage = await import("./localStorage.js");
  const todo = document.getElementById("todo-app");
  const btnContainer = document.getElementById("button");
  let owner = "my";

  let todoItemList = await localStorage.getTodoList(owner);
  createTodoApp(todo, {
    title: "Мои дела",
    owner,
    todoItemList,
    onCreateFormSubmit: localStorage.createTodoItem,
    onDoneClick: localStorage.switchTodoItemDone,
    onDeleteClick: localStorage.deleteTodoItem,
  });

  const button = createButton(btnContainer);

  button.addEventListener("click", async function () {
    if (button.textContent === "Перейти на серверное хранилище") {
      const serverStorage = await import("./api.js");
      button.textContent = "Перейти на локальное хранилище";
      todo.innerHTML = "";
      let owner = "my";
      let todoItemList = await serverStorage.getTodoList(owner);
      createTodoApp(todo, {
        title: "Мои дела",
        owner,
        todoItemList,
        onCreateFormSubmit: serverStorage.createTodoItem,
        onDoneClick: serverStorage.switchTodoItemDone,
        onDeleteClick: serverStorage.deleteTodoItem,
      });
    } else {
      let localStorage = await import("./localStorage.js");
      button.textContent = "Перейти на серверное хранилище";
      todo.innerHTML = "";
      let todoItemList = localStorage.getTodoList(owner);
      createTodoApp(todo, {
        title: "Мои дела",
        owner,
        todoItemList,
        onCreateFormSubmit: localStorage.createTodoItem,
        onDoneClick: localStorage.switchTodoItemDone,
        onDeleteClick: localStorage.deleteTodoItem,
      });
    }
  });
}
