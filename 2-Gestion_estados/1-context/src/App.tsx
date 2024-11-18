import { useState } from 'react';
import './App.css';
import { Todo } from './types';
import Dashboard from './components/Dashboard';
import MainContent from './components/MainContent';

import TodosContext from './contexts/TodosContext';

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 0, name: 'cocinar', completed: false },
    { id: 1, name: 'Ordenar closet', completed: false },
  ]);
  const addTodo = (todo: Todo) => {
    setTodos([todo, ...todos]);
  };

  return (
    //------ envolvemos en TodosContext todos los componentes y le pasamos los valores iniciales llenos

    <TodosContext.Provider value={{ todos, addTodo }}>
      {/*--------- y ahora y apodemos quitar el estado com propiedades y vmaos a los componentes y usamos el context */}

      {/*-------- antes se le pasaron los estados como propiedades */}
      {/* <Dashboard amount={todos.length} />
      <MainContent addTodo={addTodo} todos={todos} /> */}

      {/* -----ahora no se le pasa nada */}

      <Dashboard />
      <MainContent />

      {/* ------ */}
    </TodosContext.Provider>
  );
}

export default App;
