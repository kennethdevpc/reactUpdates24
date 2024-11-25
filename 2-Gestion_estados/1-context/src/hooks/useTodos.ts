import { useContext } from 'react';
import TodosContext from '../contexts/TodosContext';

function useTodos() {
  return useContext(TodosContext);
}

export default useTodos;
