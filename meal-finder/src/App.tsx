import { useState } from 'react';
import './App.css';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from './components/Header';
import SideNav from './components/SideNav';

import MainContent from './components/MainContent';
import { set } from 'react-hook-form';
import { Category, Meal } from './types';
import useHttpData from './hooks/useHttpData';

const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const defaultCategory: Category = { strCategory: 'Beef' };

const makeMealUrl = (category: Category) =>
  `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(defaultCategory);

  const { data, loading } = useHttpData<Category>(url);
  const { data: dataMeal, loading: loadingMeal } = useHttpData<Meal>(makeMealUrl(defaultCategory));

  console.log('data:', { dataMeal });

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
