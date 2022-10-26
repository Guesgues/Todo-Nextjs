interface TodoModel {
  title: string;
  id: string;
  completed: boolean;
}

export type AddTodo = {
  title: string;
  completed: boolean;
};

export enum filter {
  all = "all",
  done = "done",
  undone = "undone",
}

export default TodoModel;
