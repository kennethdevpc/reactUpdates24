import axios from 'axios';
import { useState } from 'react';

export default <T>() => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>([]);
  const fetch = (url: string) => {
    setLoading(true);

    axios
      .get(url)
      .then((response) => {
        setData(response.data.meals[0]);
      })
      .finally(() => {
        console.log('fin');
      });
  };

  return { loading, data, fetch };
};
