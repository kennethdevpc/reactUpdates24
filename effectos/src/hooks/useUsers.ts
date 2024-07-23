import { useEffect, useState } from 'react';

type User = {
  //----al verificar la api veo que tiene estos campos en el objeto, por ahora solo quiero estos 2 campos
  id: number;
  name: string;
};
export default function useUsers() {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function hook() {
      const url = 'https://jsonplaceholder.typicode.com/users';
      setLoading(true);
      try {
        const response = await fetch(url); //---1
        if (!response.ok) {
          //------------------2
          throw new Error(`${response.status}`);
        }
        const data: User[] = await response.json(); //---3
        setUser(data); //---4
      } catch (error) {
        setError((error as Error).message); //---5
      } finally {
        setLoading(false); //---6
      }

      // fetch(url) //----1 sin async await(SAA)
      //   .then((response) => {
      //     if (!response.ok) {
      //       //--2 sin async await(SAA)
      //       throw new Error(`${response.status}`);
      //     }
      //     return response.json() as Promise<User[]>; //--3-SAA
      //   })
      //   .then((data) => {
      //     //----4-SAA
      //     setUser(data);
      //   })
      //   .catch((error: Error) => {
      //     setError(error.message); //--5-SAA
      //   })
      //   .finally(() => {
      //     setLoading(false);//---6-SAA
      //   });
    }

    hook();
  }, []); //--si no se coloca nada solo se eejecuta una vez
  return { user, loading, error };
}
