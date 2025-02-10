//----entonces este es el contexto para: "reactUpdates24/2-Gestion_estados/3-reducers/src/app.tsx"
//const [todos, dispatch] = useReducer(todosReducer, []);
import { createContext, Dispatch, useContext } from 'react';
import { Todo, TodoAction } from './TodosProvider';

type todosContextType = {
  todos: Todo[];
  dispatch: Dispatch<TodoAction>; //----este es el typo que se espera ya que el dispatch si me paro en el archivo "app " me deja ver que tipo es y recibe una accion y sabemos que la accion en el "todosReducer" es de tipo "TodoAction"
};
const todosContext = createContext<todosContextType>({} as todosContextType);
export default todosContext;

//---uso el hook aqui en vez de crearlo en un archivo aparte
export function useTodos() {
  return useContext(todosContext); // useContext(todosContext);
}
