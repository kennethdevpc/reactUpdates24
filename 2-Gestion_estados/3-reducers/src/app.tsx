import './app.css';
import { useReducer } from 'react'; //----1) logica para usar reducer

//-------Cuando se hace "dispatch", se ejecuta el "reducer",
//------- y recibe en "action" los parametros que le pasamos desde el dispatch

type Todo = {
  //----es un typo para el elemento de la lista
  id: number;
  name: string;
};
//------Esto es el tipo con el que vendra la informacion del dispatch
type addAction = {
  type: 'ADD';
  todo: Todo;
};
type deleteAction = {
  type: 'DELETE';
  todoId: number;
};
//---como el action recibe un objeto con el typo y el payload, entonces se puede hacer asi:
//---type Action = {type: "DELETE"  ;  todoId: number;} | {  type: "DELETE"  ;  todoId: number;};
//---de una manera mas ordenaa para recibir 2 tipos pues se hace asi
type Action = addAction | deleteAction;

const reducer = (todos: Todo[], action: Action) => {
  switch (action.type) {
    case 'ADD':
      return [...todos, { ...action.todo, id: action.todo.id * Math.random() }];
    case 'DELETE':
      return [...todos.filter((todo) => todo.id !== action.todoId)];
  }
  return todos; //----siempre hay que retornar el estado
};

export function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  return (
    //----logica para usar reducer
    <>
      <button onClick={() => dispatch({ type: 'ADD', todo: { id: 1, name: 'lista' } })}>
        Incrementar
      </button>
      <ul></ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          Nombre {todo.name}
          <button onClick={() => dispatch({ type: 'DELETE', todoId: todo.id })}>
            Eliminar esta nota
          </button>
        </li>
      ))}
    </>
  );
}
