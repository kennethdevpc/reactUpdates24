import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [user, setUser] = useState<string>();
  useEffect(() => {
    console.log('ejecutando hook---', user);
  }, []); //--si no se coloca nada solo se eejecuta una vez
  //--------ejecucion una sola vez
  // -sin dependencias podria caer en un bucle infinito
  // // const [user, setUser] = useState<string[]>([]);
  // // useEffect(() => {
  // //   console.log('ejecutando solo una vez');
  // //   setUser(['hola', 'mundo']);
  // // }, []); //---se le agrega el [] para que solo se ejecute una vez
  //--------para el desmonte
  // // useEffect(() => {
  // //   console.log('useEffect', document.title);
  // //   document.title = 'cambie el titulo';
  // //   return () => {
  // //     //---para el desmonte uso el return
  // //     console.log('se ejecut despues del desmonte ');
  // //   };
  // // });

  return (
    <h1>
      <button onClick={() => setUser('--nuevo estado del user--')}>Cambiar el estado </button>hola
      mundo
    </h1>
  );
}

export default App;
