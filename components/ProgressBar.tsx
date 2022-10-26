import React, { useContext, useMemo } from "react";
import { TodoContext } from "../store/store-todo";
import classes from "styles/Home.module.css";


const ProgressBar = () => {
  const { todoList } = useContext(TodoContext);

  const countDone = useMemo(() => {
    let done = todoList.filter((item) => item.completed === true).length;
    return done;
  }, [todoList]);

  return (
    <div className={classes.progressbox}>
      <div className={classes.progressgroup}>
        <div className={classes.progresstitle}>Progress</div>
        <progress
          className={classes.progressbar}
          value={countDone}
          max={todoList.length}
        ></progress>
        <div className={classes.progresstext}>{countDone} completed</div>
      </div>
    </div>
  );
};

export default ProgressBar;
