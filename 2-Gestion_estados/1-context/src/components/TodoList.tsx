import useTodos from '../hooks/useTodos';
type Props = {
  // --------ya no usaremos nuevamente las propiedades ya que usaremos context
  // todos: Todo[];
  // addTodo: (todo: Todo) => void;
};

function TodoList({}: Props) {
  // --------ahora si aqui uso el context ya con el estado global, en esta ocasion con el uso del hook
  const { todos, addTodo } = useTodos();
  // --------el resto de codigo aqui no cambia sigue igual que antes ya que se conservan el nombre de las propiedades
  return (
    <>
      <button
        onClick={() => addTodo({ id: Math.random(), name: 'Texto agregado', completed: false })}
      >
        Agregar
      </button>
      <ul>
        {todos.map((e) => {
          return <li key={e.id}>{e.name}</li>;
        })}
      </ul>
    </>
  );
}

export default TodoList;
