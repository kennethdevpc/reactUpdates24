import React from 'react';
import { Meal } from '../types';

import MealCard from './MealCard';
import { SimpleGrid } from '@chakra-ui/react';
import SkeletonCard from './SkeletonCard';

type Props = {
  loading: boolean;
  meals: Meal[];
};

function MainContent({ loading, meals }: Props) {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <SimpleGrid columns={[1, 2, null, 3]} spacing="20px">
        {loading && skeletons.map((skeleton) => <SkeletonCard key={skeleton} />)}
        {!loading && meals.map((meal) => <MealCard key={meal.idMeal} meal={meal} />)}
      </SimpleGrid>
    </>
  );
}

export default MainContent;
