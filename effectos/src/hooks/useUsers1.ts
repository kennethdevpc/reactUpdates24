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
    const url = 'https://jsonplaceholder.typicode.com/users';
    setLoading(true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}`);
        }
        return response.json() as Promise<User[]>;
      })

      //----aqui lo que hace es convertir la data,//con un tyo de dato especifico , para que no quede any
      .then((data) => {
        //-----------------este paso de pasar los datos devueltos a un tipo se llama "How to deserialize JSON object into an interface"
        setUser(data);
      })
      .catch((error: Error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); //--si no se coloca nada solo se eejecuta una vez
  return { user, loading, error };
}
