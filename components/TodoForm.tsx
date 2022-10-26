import React, { useRef, useContext } from "react";
import { AddTodo } from "../models/todo";
import { TodoContext } from "../store/store-todo";
import classes from "../styles/Home.module.css";

const TodoForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addTodo } = useContext(TodoContext);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputRef.current?.value == "") {
      return;
    }
    const Addtodo = {
      title: inputRef.current!.value,
      completed: false,
    };

    addTodo(Addtodo);

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
