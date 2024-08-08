import { useEffect, useState } from 'react';
import './App.css';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from './components/Header';
import SideNav from './components/SideNav';

import MainContent from './components/MainContent';
import { set } from 'react-hook-form';
import axios from 'axios';
import { CategoriesResponse, Category } from './types';

function App() {
  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const [selectedCategory, setSelectedCategory] = useState<Category>({ strCategory: 'Beef' });
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);
    axios
      .get<CategoriesResponse>(url, { signal })
      // .then((re) => { //----sin destructuracion
      .then(({ data }) => {
        // setData(re.data.meals); //----sin destructuracion
        if (!ignore) {
          //----si tiene que ignorar entonces no vuelve a setear
          setData(data.meals);
        }
      })
      .finally(() => {
        if (!ignore) {
          //----si tiene que ignorar entonces no vuelve a setear
          setLoading(false);
        }
      });

    return () => {
      ignore = true; //----cuando se sale o termina el proceso(la 1era vez) entonces pone en true pa que no vuelva a ejecutar el set de react
      controller.abort();
    };
  }, []);

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"`}
      gridTemplateRows={'60px 1fr '}
      gridTemplateColumns={{ sm: `0 1fr`, md: `250px 1fr` }}
      fontSize={14}
    >
      <GridItem pl="2" bg="orange.300" area={'header'}>
        <Header></Header>
      </GridItem>
      <GridItem p="5" area={'nav'} height="calc(100vh - 60px)">
        <SideNav
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={data}
          loading={loading}
        ></SideNav>
      </GridItem>
      <GridItem pl="2" bg="green.300" area={'main'}>
        <MainContent></MainContent>
      </GridItem>
    </Grid>
  );
}

export default App;
