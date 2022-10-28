import React, { useMemo, useState } from "react";
import TodoModel from "../models/todo";
import { useTodoContext } from "../store/store-todo";
import classes from "../styles/Home.module.css";
import classNames from "classnames";

interface TodoDetailsProps {
  todos: TodoModel;
}
const TodoDetails = ({ todos }: TodoDetailsProps) => {
  const [todoText, setTodoText] = useState<string>(todos.title);
  const [editing, setEditing] = useState<boolean>(false);
  const { id, completed } = todos;

  const { removeTodo, checkTodo, updateTodo } = useTodoContext();

  const removeTodoHanlder = () => {
    removeTodo(id);
  };

  const checkTodoHandler = () => {
    checkTodo(id);
  };

  const saveEditTodoHandler = () => {
    updateTodo(id, todoText);
    setEditing(false);
  };

  const onEnterPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      saveEditTodoHandler();
      setEditing(false);
      return;
    }
  };
  const todo_completed = useMemo(() => {
    return completed ? classes["todo-item_completed"] : "";
  }, [completed]);

  const todo_editing = useMemo(() => {
    return editing ? classes["todo-item_editing"] : "";
  }, [editing]);

  const hide = useMemo(() => {
    return editing ? classes.hide : "";
  }, [editing]);

  return (
    <div
      className={classNames(classes.todo_item, todo_completed, todo_editing)}
    >
      <div>
        <input
          className={classNames(classes.checktodo, hide)}
          type="checkbox"
          checked={completed}
          onChange={() => checkTodoHandler()}
        />
      </div>
      <div className={classes.todolist}>
        {editing ? (
          <input
            onKeyPress={onEnterPressHandler}
            className={classes.inputtodo}
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
            onClick={removeTodoHanlder.bind(null, todos)}
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
