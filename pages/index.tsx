import type { NextPage } from "next";
import ProgessBar from "../components/ProgressBar";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TaskFilters from "../components/TaskFilters";
import classes from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <main className="App">
      <div className={classes.container}>
        <ProgessBar />
        <TaskFilters />
        <TodoList />
        <TodoForm />
      </div>
    </main>
  );
};

export default Home;
