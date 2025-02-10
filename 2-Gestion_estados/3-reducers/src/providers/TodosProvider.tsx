import { ReactNode, useReducer } from 'react';
import todosReducer from '../todos/todosReducer';
import TodosContext from '../todos/todosContext';

type props = {
  children: ReactNode;
};

export default function TodosProvider({ children }: props) {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return <TodosContext.Provider value={{ todos, dispatch }}>{children}</TodosContext.Provider>;
}
