import { useTodos } from '../todos';
import useTodosStore from '../todos/store';

type Props = {};

function MainContent({}: Props) {
  // const { todos, dispatch } = useTodos();
  const { todos, add, destroy } = useTodosStore(); //----uso el store credo en el zustand
  return (
    <>
      {/* <button
        onClick={() => {
          const id = Math.random();
          dispatch({ type: 'ADD', todo: { id, name: 'lista' } });
        }}
      > */}
      <button
        onClick={() => {
          const id = Math.random();
          add({ id, name: `lista ${id} ` });
        }}
      >
        Incrementar
      </button>
      <ul></ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          Nombre {todo.name}
          {/* <button onClick={() => dispatch({ type: 'DELETE', todoId: todo.id })}>
            Eliminar esta nota ve
          </button> */}
          <button onClick={() => destroy(todo.id)}>Eliminar esta nota ve</button>
        </li>
      ))}
    </>
  );
}

export default MainContent;
