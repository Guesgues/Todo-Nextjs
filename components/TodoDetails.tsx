import React, { useContext, useState } from "react";
import TodoModel from "../models/todo";
import { TodoContext } from "../store/store-todo";
import classes from "../styles/Home.module.css";
import classNames from "classnames";

interface TodoDetailsProps {
  todos: TodoModel;
}
const TodoDetails = ({ todos }: TodoDetailsProps) => {
  const [todoText, setTodoText] = useState<string>(todos.title);
  const [editing, setEditing] = useState<boolean>(false);

  const { removeTodo, checkTodo, updateTodo } = useContext(TodoContext);

  const removeTodoHanlder = () => {
    console.log("todo", todos);
    removeTodo(todos.id);
  };

  const checkTodoHandler = () => {
    checkTodo(todos.id);
  };

  const saveEditTodoHandler = () => {
    updateTodo(todos.id, todoText);
    setEditing(false);
  };

  const onEnterPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      saveEditTodoHandler();
      setEditing(false);
      return;
    }
  };
  const todo_completed = todos.completed ? classes["todo-item_completed"] : "";

  const todo_editing = editing ? classes["todo-item_editing"] : "";

  const hide = editing ? classes.hide : "";

  return (
    <div
      className={classNames(classes.todo_item, todo_completed, todo_editing)}
    >
      <div>
        <input
          className={classNames(classes.checktodo, hide)}
          type="checkbox"
          checked={todos.completed}
          onChange={() => checkTodoHandler()}
        />
      </div>
      <div className={classes.todolist}>
        {editing ? (
          <input
            onKeyPress={onEnterPressHandler}
            className={classes.input}
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          ></input>
        ) : (
          <div className={classes.title}>{todoText}</div>
        )}
      </div>
      <li className={classes.drop}>
        <div className={classNames(hide)}>...</div>
        <div className={classes.dropdown}>
          <a
            className={classNames(classes.drop_link, hide, classes.btedit)}
            onClick={() => setEditing(true)}
          >
            Edit
          </a>
          <a
            className={classNames(classes.drop_link, hide, classes.btdelete)}
            onClick={removeTodoHanlder.bind(null, todos.id)}
          >
            Delete
          </a>
        </div>
      </li>
      <button
        className={classNames(classes.btsave, !editing ? classes.hide : "")}
        onClick={saveEditTodoHandler}
      >
        Save
      </button>
    </div>
  );
};

export default TodoDetails;
