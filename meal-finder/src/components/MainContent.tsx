import React from 'react';
import { Meal } from '../types';

import MealCard from './MealCard';
import { SimpleGrid } from '@chakra-ui/react';
import SkeletonCard from './SkeletonCard';

type Props = {
  loading: boolean;
  meals: Meal[];
  openRecipe: (meal: Meal) => void;
};

function MainContent({ loading, meals, openRecipe }: Props) {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <button style={{ cursor: 'pointer' }}>click opopen </button>
      <SimpleGrid columns={[1, 2, null, 3]} spacing="20px">
        {loading && skeletons.map((skeleton) => <SkeletonCard key={skeleton} />)}
        {!loading &&
          meals.map((meal) => (
            <MealCard openRecipe={() => openRecipe(meal)} key={meal.idMeal} meal={meal} />
          ))}
      </SimpleGrid>
    </>
  );
}

export default MainContent;
