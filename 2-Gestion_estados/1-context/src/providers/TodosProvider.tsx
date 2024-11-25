import { ReactNode, useState } from 'react';
import TodosContext from '../contexts/TodosContext';
import { Todo } from '../types';

type Props = {
  children: ReactNode;
};

function TodosProvider({ children }: Props) {
  //------creo o defino el estado, que sera la infomacion que se le pasara al context
  const [todos, setTodos] = useState<Todo[]>([
    { id: 0, name: 'cocinar', completed: false },
    { id: 1, name: 'Ordenar closet', completed: false },
  ]);
  const addTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
  };

  return (
    <TodosContext.Provider value={{ todos, addTodo }}>
      {/* uso el children para pasarle el contexto */}

      {children}
    </TodosContext.Provider>
  );
}

export default TodosProvider;
