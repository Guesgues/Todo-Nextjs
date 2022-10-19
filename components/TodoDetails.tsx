import React, { useContext, useState } from "react";
import TodoModel from "../models/todo";
import { TodoContext } from "../store/store-todo";
import classes from "../styles/Home.module.css";

interface TodoDetailsProps {
  todos: TodoModel;
}
const TodoDetails = ({ todos }: TodoDetailsProps) => {
  const [todoText, setTodoText] = useState<string>(todos.title);
  const [editing, setEditing] = useState<boolean>(false);

  const todoCtx = useContext(TodoContext);
  const removeTodo = todoCtx.removeTodo;
  const checkTodo = todoCtx.checkTodo;
  const updateTodo = todoCtx.updateTodo;

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
    <div className={`${classes.todo_item} ${todo_completed} ${todo_editing}`}>
      <div>
        <input
          className={`${classes.checktodo} ${hide}`}
          type="checkbox"
          checked={todos.completed}
          onChange={() => checkTodoHandler()}
        />
        {/* <button
          className={`${classes.icon} ${classes.checkIcon} ${hide}`}
          onClick={checkTodoHandler.bind(null, todos.id)}
        >
          <i className="fa fa-check-square"></i>
        </button> */}
      </div>
      <div className={classes.todolist}>
        {!editing && <div className={classes.title}>{todoText}</div>}
        {editing && (
          <input
            onKeyPress={onEnterPressHandler}
            className={classes.input}
            type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
          ></input>
        )}
      </div>
      <li className={classes.drop}>
        <div className={`${hide}`}>...</div>
        <div className={classes.dropdown}>
          <a
            className={`${classes.drop_link} ${hide} ${classes.btedit}`}
            onClick={() => setEditing(true)}
          >
            Edit
          </a>
          <a
            className={`${classes.drop_link} ${hide} ${classes.btdelete}`}
            onClick={removeTodoHanlder.bind(null, todos.id)}
          >
            Delete
          </a>
        </div>
      </li>
      <button
        className={`${classes.btsave} ${!editing ? classes.hide : ""}`}
        onClick={saveEditTodoHandler}
      >
        Save
      </button>

      {/* <div className={classes.cell}>
        <button
          className={`${classes.icon} ${hide}`}
          onClick={() => setEditing(true)}
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          className={`${classes.icon} ${hide}`}
          onClick={removeTodoHanlder.bind(null, todos.id)}
        >
          <i className="fas fa-eraser"></i>
        </button>
        <button
          className={`${classes.icon} ${!editing ? classes.hide : ""}`}
          onClick={saveEditTodoHandler}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div> */}
    </div>
  );
};

export default TodoDetails;

// Adding edit function, need to figure out a way to turn of Editng and Change todo TExt in the same time
