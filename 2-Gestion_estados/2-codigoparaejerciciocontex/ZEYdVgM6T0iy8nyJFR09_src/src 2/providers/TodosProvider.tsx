import { ReactNode, useState } from "react";
import { Todo } from "../types";
import TodosContext from "../contexts/TodosContext";

type Props = {
  children: ReactNode;
};
export default function TodosProvider({ children }: Props) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 0, name: "Cocinar", completed: false },
    { id: 1, name: "Ordenar closet", completed: false },
  ]);

  const addTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo }}>
      {children}
    </TodosContext.Provider>
  );
}
