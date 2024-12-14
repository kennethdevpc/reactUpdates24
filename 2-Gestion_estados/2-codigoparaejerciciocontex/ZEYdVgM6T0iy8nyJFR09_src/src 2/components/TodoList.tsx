import useTodos from "../hooks/useTodos";

type Props = {};

function TodoList({}: Props) {
  console.log("TodoList");
  const { todos, addTodo } = useTodos();
  return (
    <>
      <button
        onClick={() =>
          addTodo({
            id: Math.random(),
            name: "Chanchito feliz",
            completed: false,
          })
        }
      >
        Agregar
      </button>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.name}</li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
