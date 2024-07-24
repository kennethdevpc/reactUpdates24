import { useEffect, useState } from 'react';

type User = {
  //----al verificar la api veo que tiene estos campos en el objeto, por ahora solo quiero estos 2 campos
  id: number;
  name: string;
};
export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const controller = new AbortController(); //-------funcion que viene en los navegadores para cancelar peticiones
    const { signal } = controller; //-------Esto es un objeto que se le pasa a la peticion fetch tal como se le pasan por ejemplo un POST, GET, etc

    async function hook() {
      const url = 'https://jsonplaceholder.typicode.com/users';
      setLoading(true);
      try {
        const response = await fetch(url, { signal }); //----le paso el objeto signal a la peticion fetch
        if (!response.ok) {
          //------------------2
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User[] = await response.json(); //---3
        setUsers(data); //---4
        setError(undefined); //------con el undefined limpio el error, para que no mande errores si se vuelve a cargar la pagina
      } catch (error) {
        setError((error as Error).message); //---5
      } finally {
        setLoading(false); //---6
      }
    }
    hook();
    return () => controller.abort(); //-----------cancelo la peticion
  }, []); //--si no se coloca nada solo se eejecuta una vez
  return { users, loading, error };
}
