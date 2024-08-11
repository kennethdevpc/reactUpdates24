import React from 'react';
import { Meal } from '../types';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';

type Props = {
  loading: boolean;
  meals: Meal[];
};

function MainContent({ loading, meals }: Props) {
  console.log('meals:', meals, loading);
  return (
    <>
      <SimpleGrid columns={[1, 2, null, 3]} spacing="40px">
        {meals.map((meal) => (
          <Card maxW="sm" key={meal.idMeal} boxShadow="lg">
            <CardBody>
              <Image src={meal.strMealThumb} alt={meal.strMeal} borderRadius="lg" />
              <Stack mt="6" spacing="3">
                <Heading size="md" color="blue.400">
                  <Text mt="4">{meal.strMeal}</Text>
                </Heading>
                <Text>
                  This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy
                  toned spaces and for people who love a chic design with a sprinkle of vintage
                  design.
                </Text>
                <Text color="blue.600" fontSize="2xl">
                  $450
                </Text>
              </Stack>
            </CardBody>
            <CardFooter pt={0}>
              <ButtonGroup spacing="2">
                <Button colorScheme="white" bgColor={'blue.400'}>
                  Ver Receta
                </Button>
                <Button variant="ghost" colorScheme="blue">
                  Add to cart
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

export default MainContent;
