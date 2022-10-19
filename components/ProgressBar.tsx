import React, { useContext } from "react";
import { TodoContext } from "../store/store-todo";
import classes from "../styles/Home.module.css";

const ProgressBar = () => {
  const todoCtx = useContext(TodoContext);

  const todoList = todoCtx.todoList;
  return (
    <div className={classes.progressbox}>
      <div className={classes.progressgroup}>
        <div className={classes.progresstitle}>Progress</div>
        <progress
          className={classes.progressbar}
          value={todoList.filter((item) => item.completed === true).length}
          max={todoList.length}
        ></progress>
        <div className={classes.progresstext}>
          {todoList.filter((item) => item.completed === true).length} completed
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
