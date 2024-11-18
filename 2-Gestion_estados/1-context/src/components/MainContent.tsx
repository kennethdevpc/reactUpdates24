import TodoList from './TodoList';

type Props = {
  //--quitamos las propiedades ya no las usaremos
};

function MainContent({}: Props) {
  return (
    <div>
      <h2>Todos</h2>

      {/* -----asi se utilizaba sin el context */}
      {/* <TodoList todos={todos} addTodo={addTodo} /> */}

      {/* ---------asi se utilizaba con el context */}
      <TodoList />
      {/* -------------- */}
    </div>
  );
}

export default MainContent;
