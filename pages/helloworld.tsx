import type { NextPage } from "next";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TaskFilters from "../components/TaskFilters";
import ProgessBar from "../components/ProgressBar";

const Home: NextPage = () => {
  return (
    <main className="App">
      <div className="container">
        <h1>Hello World</h1>
        <TaskFilters />
        <TodoList />
        <TodoForm />
      </div>
    </main>
  );
};

export default Home;
