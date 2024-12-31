import './app.css';
import { useReducer } from 'react';
import todosReducer from './reducers/todosReducer'; //-----inserto el reducer creado

export function App() {
  const [todos, dispatch] = useReducer(todosReducer, []);
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
