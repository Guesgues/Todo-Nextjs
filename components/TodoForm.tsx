import React, { useState, useRef, useContext } from "react";
import TodoModel from "../models/todo";
import { TodoContext } from "../store/store-todo";
import classes from "../styles/Home.module.css";

const TodoForm = () => {
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const todoCtx = useContext(TodoContext);
  const addTodo = todoCtx.addTodo;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo: TodoModel = {
      id: new Date().getTime().toString(),
      title: inputRef.current!.value,
      completed: false,
    };

    if (newTodo.title.trim() === "") {
      return;
    }
    addTodo(newTodo);

    inputRef.current!.value = "";
  };
  return (
    <div className={classes.todo_item}>
      <form onSubmit={submitHandler}>
        <input
          className={classes.input}
          type="text"
          placeholder="Add your todo..."
          ref={inputRef}
        ></input>
      </form>
    </div>
  );
};

export default TodoForm;
