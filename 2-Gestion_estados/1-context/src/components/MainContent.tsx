import useTitle from '../hooks/useTitle';
import TodoList from './TodoList';

type Props = {
  //--quitamos las propiedades ya no las usaremos
};

function MainContent({}: Props) {
  const { title, updateTitle } = useTitle();

  return (
    <div>
      <h2>{title.title}</h2>

      <button onClick={updateTitle}>updatetitle</button>

      {/* -----asi se utilizaba sin el context */}
      {/* <TodoList todos={todos} addTodo={addTodo} /> */}

      {/* ---------asi se utilizaba con el context */}
      <TodoList />
      {/* -------------- */}
    </div>
  );
}

export default MainContent;
