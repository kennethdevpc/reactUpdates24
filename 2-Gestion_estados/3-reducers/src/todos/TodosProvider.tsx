import { ReactNode, useReducer } from 'react';
import todosReducer from './todosReducer';
import TodosContext from './todosContext';

type props = {
  children: ReactNode;
};

export default function TodosProvider({ children }: props) {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return <TodosContext.Provider value={{ todos, dispatch }}>{children}</TodosContext.Provider>;
}
