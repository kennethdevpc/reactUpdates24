import { useEffect, useState } from 'react';
import './App.css';
import { Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import Header from './components/Header';
import SideNav from './components/SideNav';

import MainContent from './components/MainContent';
import { set } from 'react-hook-form';
import { Category, Meal, SearchForm } from './types';
import useHttpData from './hooks/useHttpData';
import axios from 'axios';
import RecipeModal from './components/RecipeModal';
import useFetch from './hooks/useFetch';

const baseUrl = 'https://www.themealdb.com/api/json/v1/1';
const url = `${baseUrl}/list.php?c=list`;
const defaultCategory: Category = { strCategory: 'Beef' };

const makeMealUrl = (category: Category) => `${baseUrl}/filter.php?c=${category.strCategory}`;

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedCategory, setSelectedCategory] = useState<Category>(defaultCategory);

  const { data, loading } = useHttpData<Category>(url);

  const {
    data: dataMeal,
    loading: loadingMeal,
    setData: setMeals,
    setLoading: setLoadingMeal,
  } = useHttpData<Meal>(makeMealUrl(defaultCategory));

  const searchApi = (SearchForm: SearchForm) => {
    const url = `${baseUrl}/search.php?s=${SearchForm.search}`;
    setLoadingMeal(true);
    axios
      .get<{ meals: Meal[] }>(url)
      .then((r) => {
        setMeals(r.data.meals);
      })
      .finally(() => {
        setLoadingMeal(false);
      });
  };

  const { fetch } = useFetch<Meal>();
  const searchMealDetails = (meal: Meal) => {
    onOpen();
    const url = `${baseUrl}/lookup.php?i=${meal.idMeal}`;

    fetch(url);
  };

  return (
    <>
      <Grid
        templateAreas={`"header header"
                    "nav main"`}
        gridTemplateRows={'60px 1fr '}
        gridTemplateColumns={{ sm: `0 1fr`, md: `250px 1fr` }}
        fontSize={14}
      >
        <GridItem
          pos="sticky"
          top={0}
          zIndex={1}
          pt="7px"
          bg="white"
          boxShadow="lg"
          area={'header'}
        >
          <Header onSubmit={searchApi}></Header>
        </GridItem>
        <GridItem
          overflowY="auto"
          pos="sticky"
          top="60px"
          left="0px"
          p="5"
          area={'nav'}
          height="calc(100vh - 60px)"
        >
          <SideNav
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={data}
            loading={loading}
          ></SideNav>
        </GridItem>
        <GridItem p="4" bg="gray.300" area={'main'}>
          <MainContent
            openRecipe={searchMealDetails}
            loading={loadingMeal}
            meals={dataMeal}
          ></MainContent>
        </GridItem>
      </Grid>
      <RecipeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default App;
