import React, { useContext } from 'react';
import TodosContext from '../contexts/TodosContext';

type Props = {
  //-----se elimina esta propiedad ya que se utilizara la propiedad ahora como context
  // amount: number;
};

function Dashboard({}: Props) {
  //--------ahora si aqui uso el context ya con el estado global
  const { todos } = useContext(TodosContext);

  return <div>{todos.length}</div>;
}

export default Dashboard;
