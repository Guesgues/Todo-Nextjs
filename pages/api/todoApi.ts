import {AddTodo} from "../../models/todo";

const baseUrl: string = process.env.NEXT_PUBLIC_API_URL!;

export const getTodosAPI = async () => {
  try {
    const response = await fetch(baseUrl + `/todos`);

    const data = await response.json();
    console.log("data", data);

    return data;
  } catch (error) {
    throw new Error("Cannot get Todos");
  }
};

export const addTodosAPI = async (todos:AddTodo) => {
  try {
    const response = await fetch(baseUrl + `/todos`, {
      method: "POST",
      body: JSON.stringify({ ...todos }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error("Sending Todo Fail");
  }
};

export const removeTodoAPI = async (id: string) => {
  try {
    const response = await fetch(baseUrl + `/todos/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw new Error("Cannot Delete Todos");
  }
};

export const editTodoAPI = async (id: string, updateText: string) => {
  try {
    const response = await fetch(baseUrl + `/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: updateText }),
    });

    const data = await response.json();

    console.log(response);
  } catch (error) {
    throw new Error("Updating Todo Fail");
  }
};

export const checkTodoAPI = async (id: string, updateComplete: boolean) => {
  try {
    const response = await fetch(baseUrl + `/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: updateComplete }),
    });
  } catch (error) {
    throw new Error("Updating Todo Fail");
  }
};
