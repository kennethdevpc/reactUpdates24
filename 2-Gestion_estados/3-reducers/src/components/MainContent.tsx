import { useTodos } from '../todos';

type Props = {};

function MainContent({}: Props) {
  const { todos, dispatch } = useTodos();
  return (
    <>
      <button
        onClick={() => {
          const id = Math.random();
          dispatch({ type: 'ADD', todo: { id, name: 'lista' } });
        }}
      >
        Incrementar
      </button>
      <ul></ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          Nombre {todo.name}
          <button onClick={() => dispatch({ type: 'DELETE', todoId: todo.id })}>
            Eliminar esta nota ve
          </button>
        </li>
      ))}
    </>
  );
}

export default MainContent;
