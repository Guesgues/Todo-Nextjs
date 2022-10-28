import React, { useContext, useEffect } from "react";
import { useTodoContext } from "../store/store-todo";
import classes from "../styles/Home.module.css";
import TodoDetails from "./TodoDetails";
import { filter } from "../models/todo";

const TodoList = () => {
  const { todoList, getTodo, Filter } = useTodoContext();

  useEffect(() => {
    let cleanfunc = true;
    if (cleanfunc) {
      getTodo();
    }

    return function cleanup() {
      cleanfunc = false;
    };
  }, []);

  const allTodos =
    Filter === filter.all &&
    todoList.map((todos) => <TodoDetails key={todos.id} todos={todos} />);

  const completedTodos =
    Filter === filter.done &&
    todoList
      .filter((todos) => todos.completed === true)
      .map((todos) => <TodoDetails key={todos.id} todos={todos} />);

  const activeTodos =
    Filter === filter.undone &&
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
