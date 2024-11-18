import { createContext } from 'react';
import { Todo } from '../types';
//----createContext recibe un valor por defecto , que va a tener inicialmente el contexto
//----como sabemos que deberia tener el "todo" y el "addTodo", ya que es lo que se le paso al componente "TodoList" entonces definimos el Typo
type TodosContextType = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
};
//----------creo el contexto le pasamos los valores iniciales que es un objeto vacio y es de tipo "TodosContextType"
export default createContext<TodosContextType>({} as TodosContextType);

//-- entoces creamos el contexto,
//-- le damos el tipo que tendra, o el estado inicial que tendra,
//-- y  le entregamos el valor inicial que seria un objeto vacio del tipo "TodosContextType"
