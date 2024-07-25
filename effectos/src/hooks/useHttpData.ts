import { useEffect, useState } from 'react';

export default function useHttpData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const controller = new AbortController(); //-------funcion que viene en los navegadores para cancelar peticiones
    const { signal } = controller; //-------Esto es un objeto que se le pasa a la peticion fetch tal como se le pasan por ejemplo un POST, GET, etc

    async function hook() {
      // const url = 'https://jsonplaceholder.typicode.com/users';
      setLoading(true);
      try {
        const response = await fetch(url, { signal }); //----le paso el objeto signal a la peticion fetch
        if (!response.ok) {
          //------------------2
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: T[] = await response.json(); //---3
        setData(data); //---4
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

  const addData = async (element: T) => {
    const initialData = [...data]; //----pongo los datos iniciales por si llegase a cambiar los datos en el futuro
    //--------le pongo un id provicional luego se reemplazara
    setData([{ id: 0, ...element }, ...data]); //---agrego primero el nuevo elemento y luego los que vienen del fetch
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', //----permite enviar datos(element) en formato json , no se requeire para axios o con esta api
        },
        body: JSON.stringify(element),
      });
      if (!response.ok) {
        setData(initialData); //----si hay un error vuelvo a los datos iniciales
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      //---una vez que devuelva la respuesta la api
      const saveData = await response.json(); //----esta si es la respuesta de la api la recibo en formato json
      //forma de respuesta api1, esta api devuelve el elemento y un id junto
      setData([saveData, ...initialData]); //---si la respuesta de la api debuelve el objeto con todo osea el id y el elemento
      //forma de respuesta api2:  setData([{ id: saveData, ...element }, ...initialData]); //---si la respuesta de la api debuelve solo el id, tocaria agregarle el elemento
      // forma de respuesta api3: setData([{ ...saveData, ...element }, ...initialData]); //---si la respuesta de la api debuelve un objeto con la propiedad de id (pero sin el elemento), tambien se le agrega el elemento
    } catch (error) {
      setError((error as Error).message);
    }
  };
  return { data, loading, error, addData };
}
