import useTodos from '../hooks/useTodos';

type Props = {
  //-----se elimina esta propiedad ya que se utilizara la propiedad ahora como context
  // amount: number;
};

function Dashboard({}: Props) {
  //--------ahora si aqui uso el Hook para llamar el context
  const { todos } = useTodos();

  return <div>{todos.length}</div>;
}

export default Dashboard;
