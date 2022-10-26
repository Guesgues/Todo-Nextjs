import React, { useState, createContext } from "react";
import {
  getTodosAPI,
  removeTodoAPI,
  editTodoAPI,
  checkTodoAPI,
  addTodosAPI,
} from "../pages/api/todoApi";

import TodoModel, { filter, AddTodo } from "../models/todo";

interface TodoContextInterface {
  todoList: TodoModel[];
  Filter: filter;
  changeFilter: (filterOrder: filter) => void;
  getTodo: () => void;
  addTodo: (todo: AddTodo) => void;
  removeTodo: (id: string) => void;
  checkTodo: (id: string) => void;
  updateTodo: (id: string, textInput: string) => void;
}

type Props = {
  children: React.ReactNode;
};

export const TodoContext = createContext<TodoContextInterface>({
  todoList: [],
  Filter: filter.all,
  changeFilter: (filterOrder: filter) => {},
  getTodo: () => {},
  addTodo: (todo: AddTodo) => {},
  removeTodo: (id: string) => {},
  checkTodo: (id: string) => {},
  updateTodo: (id: string, textInput: string) => {},
});

const TodoContextProvider = (props: Props) => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filterOrder, setFilterOrder] = useState<filter>(filter.all);

  const changeFilterHandler = (filterOrder: filter) => {
    setFilterOrder(filterOrder);
  };

  const getTodoHandler = async () => {
    const loadedTodos = await getTodosAPI();
    setTodos(loadedTodos);
  };

  const addTodoHandler = async (todos: AddTodo) => {
    const loadedTodos = await addTodosAPI({
      title: todos.title,
      completed: todos.completed,
    });
    console.log("add", loadedTodos);

    setTodos((prevTodos) => {
      return prevTodos.concat(loadedTodos);
    });
  };

  const removeTodoHanlder = async (id: string) => {
    await removeTodoAPI(id);
    setTodos((prevTodos) => {
      return prevTodos.filter((todos) => todos.id !== id);
    });
  };

  const checkTodoHandler = async (id: string) => {
    const targetTodoIndex = todos.findIndex((todos) => todos.id === id);
    const targetTodo = todos[targetTodoIndex];
    const updateTodo = { ...targetTodo, completed: !targetTodo.completed };
    let updateTodos = [...todos];
    updateTodos[targetTodoIndex] = updateTodo;
    setTodos(updateTodos);
    await checkTodoAPI(id, !targetTodo.completed);
  };

  const updatingTodoHandler = async (id: string, textInput: string) => {
    const targetTodoIndex = todos.findIndex((todo) => todo.id === id);
    const targetTodo = todos[targetTodoIndex];
    const updateTodo: TodoModel = { ...targetTodo, title: textInput };
    let updateTodos = [...todos];
    updateTodos[targetTodoIndex] = updateTodo;
    setTodos(updateTodos);
    await editTodoAPI(id, textInput);
  };

  const todoContextValue: TodoContextInterface = {
    todoList: todos,
    Filter: filterOrder,
    changeFilter: changeFilterHandler,
    getTodo: getTodoHandler,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHanlder,
    checkTodo: checkTodoHandler,
    updateTodo: updatingTodoHandler,
  };

  return (
    <TodoContext.Provider value={todoContextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
