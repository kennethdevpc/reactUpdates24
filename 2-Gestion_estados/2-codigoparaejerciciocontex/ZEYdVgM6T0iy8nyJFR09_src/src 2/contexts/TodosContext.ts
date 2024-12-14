import { createContext } from "react";
import { Todo } from "../types";

type TodosContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
};

export default createContext<TodosContextType>({} as TodosContextType);
