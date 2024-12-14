import TodoList from "./TodoList";

type Props = {};

function MainContent({}: Props) {
  console.log("MainContent");
  return (
    <div>
      <h2>Todos</h2>
      <TodoList />
    </div>
  );
}

export default MainContent;
