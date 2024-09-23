import React from 'react';
import { MealDetails } from '../types';
import {
  Heading,
  Image,
  ListItem,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  OrderedList,
  Text,
} from '@chakra-ui/react';

type Props = {
  data: MealDetails;
};

function RecipeModalContent({ data }: Props) {
  const joinIngredients = (data: MealDetails) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      //------> busco por el nombre de la key y si hay algo lo agrego al array
      if (data[`strIngredient${i}`]) {
        ingredients.push(`${data[`strIngredient${i}`]} - ${data[`strMeasure${i}`]}`);
      } else {
        break;
      }
    }
    return ingredients;
  };

  return (
    <>
      <ModalHeader>{data.strMeal}</ModalHeader>
      <ModalCloseButton></ModalCloseButton>
      <ModalBody>
        <Image width={'100%'} src={data.strMealThumb} alt={data.strMeal} />
        <Heading size="md" mt="4" mb="4">
          Ingredients
        </Heading>
        <OrderedList mb="4">
          {joinIngredients(data).map((ingredient) => (
            <ListItem key={ingredient}>{ingredient}</ListItem>
          ))}
        </OrderedList>

        <Text whiteSpace="pre-line">{data.strInstructions}</Text>
      </ModalBody>
    </>
  );
}

export default RecipeModalContent;
