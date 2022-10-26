import React, { useContext } from "react";
import classes from "../styles/Home.module.css";
import { TodoContext } from "../store/store-todo";
import { filter } from "../models/todo";
import classNames from "classnames";

const TaskFilters = () => {
  const { changeFilter, Filter } = useContext(TodoContext);

  const changeFilterOrder = (filter: filter) => {
    changeFilter(filter);
  };

  return (
    <div>
      <span className={classes.texttask}>Task</span>
      <select
        className={classes.filter}
        onChange={(e) => {
          if (e.target.value == "all") {
            changeFilterOrder(filter.all);
          } else if (e.target.value == "done") {
            changeFilterOrder(filter.done);
          } else if (e.target.value == "undone") {
            changeFilterOrder(filter.undone);
          }
        }}
      >
        <option
          value="all"
          className={classNames(
            classes.item,
            Filter === filter.all ? classes.active : ""
          )}
        >
          All
        </option>
        <option
          value="done"
          className={classNames(
            classes.item,
            Filter === filter.done ? classes.active : ""
          )}
        >
          Done
        </option>
        <option
          value="undone"
          className={classNames(
            classes.item,
            Filter === filter.undone ? classes.active : ""
          )}
        >
          Undone
        </option>
      </select>
    </div>
  );
};

export default TaskFilters;
