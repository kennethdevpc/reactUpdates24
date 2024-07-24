// import { useEffect, useState } from 'react';
import './App.css';
import useFetchData from './hooks/useFetchData';

// type User = {
//   //----al verificar la api veo que tiene estos campos en el objeto, por ahora solo quiero estos 2 campos
//   id: number;
//   name: string;
// };

type User = {
  //----al verificar la api veo que tiene estos campos en el objeto, por ahora solo quiero estos 2 campos
  id: number;
  name: string;
};

function App() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const { data: users, loading, error } = useFetchData<User>(url);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error && !loading) {
    return <p>Ha ocurrido un Error: {error}</p>;
  }

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h1>{user.name}</h1>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
