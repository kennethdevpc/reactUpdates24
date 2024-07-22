// import { useEffect, useState } from 'react';
import './App.css';
import useUsers from './hooks/useUsers';

// type User = {
//   //----al verificar la api veo que tiene estos campos en el objeto, por ahora solo quiero estos 2 campos
//   id: number;
//   name: string;
// };

function App() {
  const { user, loading, error } = useUsers();
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error && !loading) {
    return <p>Ha ocurrido un Error: {error}</p>;
  }

  return (
    <>
      <ul>
        {user.map((user) => (
          <li key={user.id}>
            <h1>{user.name}</h1>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
