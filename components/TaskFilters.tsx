import React, { useContext } from "react";
import classes from "../styles/Home.module.css";
import { useTodoContext } from "../store/store-todo";
import { filter } from "../models/todo";
import classNames from "classnames";

const TaskFilters = () => {
  const { changeFilter, Filter } = useTodoContext();

  const changeFilterOrder = (filter: filter) => {
    changeFilter(filter);
  };

  return (
    <div>
      <span className={classes.texttask}>Task</span>
      <select
        className={classes.filter}
        onChange={(e) => {
          switch (e.target.value) {
            case "all":
              changeFilterOrder(filter.all);
              break;
            case "done":
              changeFilterOrder(filter.done);
              break;
            case "undone":
              changeFilterOrder(filter.undone);
              break;
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
