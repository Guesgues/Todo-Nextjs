import React, { useContext } from "react";
import classes from "../styles/Home.module.css";
import { TodoContext } from "../store/store-todo";
import { filter } from "../models/todo";

const TaskFilters = () => {
  const todoCtx = useContext(TodoContext);
  const changeFilter = todoCtx.changeFilter;
  const filterOrder = todoCtx.filter;
  // console.log(todoCtx);

  const changeFilterOrder = (filter: filter) => {
    changeFilter(filter);
  };

  return (
    <div>
      {/* <li className={classes.filter}>
        select <i className={classes.icon}></i>
        <div className={classes.selectfilter}>
          <a
            className={`${classes.item}  ${
              filterOrder === filter.all ? classes.active : ""
            }`}
            href="#"
            onClick={() => changeFilterOrder(filter.all)}
          >
            All
          </a>
          <a
            className={`${classes.item} ${
              filterOrder === filter.completed ? classes.active : ""
            }`}
            href="#"
            onClick={() => changeFilterOrder(filter.completed)}
          >
            Done
          </a>
          <a
            className={`${classes.item} ${
              filterOrder === filter.active ? classes.active : ""
            }`}
            href="#"
            onClick={() => changeFilterOrder(filter.active)}
          >
            Undone
          </a>
        </div>
      </li> */}
      <ul className={classes.filter}>
        <li onClick={() => changeFilterOrder(filter.all)}>
          <a
            className={filterOrder === filter.all ? classes.active : ""}
            href="#"
          >
            All
          </a>
        </li>
        <li onClick={() => changeFilterOrder(filter.done)}>
          <a
            className={filterOrder === filter.done ? classes.active : ""}
            href="#"
          >
            Done
          </a>
        </li>
        <li onClick={() => changeFilterOrder(filter.undone)}>
          <a
            className={filterOrder === filter.undone ? classes.active : ""}
            href="#"
          >
            Undone
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TaskFilters;
