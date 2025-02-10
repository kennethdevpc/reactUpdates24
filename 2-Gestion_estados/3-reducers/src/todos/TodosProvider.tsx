import { ReactNode, useReducer } from 'react';
import TodosContext from './todosContext';

//----todosReducer
export type Todo = {
  id: number;
  name: string;
};
type addAction = {
  type: 'ADD';
  todo: Todo;
};
type deleteAction = {
  type: 'DELETE';
  todoId: number;
};
export type TodoAction = addAction | deleteAction;

const todosReducer = (todos: Todo[], action: TodoAction) => {
  switch (action.type) {
    case 'ADD':
      return [...todos, { ...action.todo, id: action.todo.id * Math.random() }];
    case 'DELETE':
      return [...todos.filter((todo) => todo.id !== action.todoId)];
  }
  return todos; //----siempre hay que retornar el estado
};

type props = {
  children: ReactNode;
};

export default function TodosProvider({ children }: props) {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return <TodosContext.Provider value={{ todos, dispatch }}>{children}</TodosContext.Provider>;
}
