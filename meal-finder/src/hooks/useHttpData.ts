import { useEffect, useState } from 'react';
import { CategoriesResponse, Category } from '../types';
import axios from 'axios';

export default function useHttpData<T>(url: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);
    console.log('---cero then', ignore, 'time:', document.timeline.currentTime);

    axios
      .get<{ meals: T[] }>(url, { signal })
      // .then((re) => { //----sin destructuracion
      .then(({ data }) => {
        console.log('---1er then', ignore, 'time:', document.timeline.currentTime);
        // setData(re.data.meals); //----sin destructuracion
        if (!ignore) {
          //----si tiene que ignorar entonces no vuelve a setear
          setData(data.meals);
        }
      })
      .finally(() => {
        console.log('---2do finnally', ignore, 'time:', document.timeline.currentTime);

        if (!ignore) {
          //----si tiene que ignorar entonces no vuelve a setear
          setLoading(false);
        }
      });

    return () => {
      console.log('---3er return ', ignore, 'time:', document.timeline.currentTime);

      ignore = true; //----cuando se sale o termina el proceso(la 1era vez) entonces pone en true pa que no vuelva a ejecutar el set de react
      controller.abort();
    };
  }, []);

  return { data, loading };
}
