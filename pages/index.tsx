import type { NextPage } from "next";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TaskFilters from "../components/TaskFilters";
import ProgessBar from "../components/ProgressBar";
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
