import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "../store/store-todo";
import classes from "../styles/Home.module.css";
import TodoDetails from "./TodoDetails";
import { filter } from "../models/todo";

const TodoList = () => {
  const todoCtx = useContext(TodoContext);

  const todoList = todoCtx.todoList;
  const getTodo = todoCtx.getTodo;
  const filterOrder = todoCtx.filter;

  useEffect(() => {
    getTodo();
  }, []);

  const allTodos =
    filterOrder === filter.all &&
    todoList.map((todos) => <TodoDetails key={todos.id} todos={todos} />);

  const completedTodos =
    filterOrder === filter.done &&
    todoList
      .filter((todos) => todos.completed === true)
      .map((todos) => <TodoDetails key={todos.id} todos={todos} />);

  const activeTodos =
    filterOrder === filter.undone &&
    todoList
      .filter((todos) => todos.completed === false)
      .map((todos) => <TodoDetails key={todos.id} todos={todos} />);

  return (
    <div className={classes.todoList}>
      {allTodos}

      {completedTodos}

      {activeTodos}
    </div>
  );
};

export default TodoList;
