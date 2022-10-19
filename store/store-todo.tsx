import React, { useState, createContext } from "react";
import {
  getTodosAPI,
  removeTodoAPI,
  editTodoAPI,
  checkTodoAPI,
} from "../pages/api/todoApi";

import TodoModel, { filter } from "../models/todo";

interface TodoContextInterface {
  test: string;
  todoList: TodoModel[];
  filter: filter;
  changeFilter: (filterOrder: filter) => void;
  getTodo: () => void;
  addTodo: (todo: TodoModel) => void;
  removeTodo: (id: string) => void;
  checkTodo: (id: string) => void;
  updateTodo: (id: string, textInput: string) => void;
}

type Props = {
  children: React.ReactNode;
};

export const TodoContext = createContext<TodoContextInterface>({
  test: "",
  todoList: [],
  filter: filter.all,
  changeFilter: (filterOrder: filter) => {},
  getTodo: () => {},
  addTodo: (todo: TodoModel) => {},
  removeTodo: (id: string) => {},
  checkTodo: (id: string) => {},
  updateTodo: (id: string, textInput: string) => {},
});

const TodoContextProvider = (props: Props) => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [filterOrder, setFilterOrder] = useState<filter>(filter.all);

  const changeFilterHandler = (filterOrder: filter) => {
    console.log("test", filterOrder);
    setFilterOrder(filterOrder);
  };

  const getTodoHandler = async () => {
    // console.log("todo");
    const loadedTodos = await getTodosAPI();
    setTodos(loadedTodos);
  };

  const addTodoHandler = async (todos: TodoModel) => {
    const newTodo: TodoModel = {
      ...todos,
    };
    setTodos((prevTodos) => {
      return prevTodos.concat(newTodo);
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
    test: "hello world",
    todoList: todos,
    filter: filterOrder,
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
