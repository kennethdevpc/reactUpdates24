import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Meal } from '../types';
type Props = {
  meal: Meal;
  openRecipe: () => void;
};

function MealCard({ openRecipe, meal }: Props) {
  return (
    <Card maxW="sm" boxShadow="lg">
      <CardBody>
        <Image src={meal.strMealThumb} alt={meal.strMeal} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md" color="blue.400">
            <Text mt="4">{meal.strMeal}</Text>
          </Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired spaces, earthy toned
            spaces and for people who love a chic design with a sprinkle of vintage design.
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <CardFooter pt={0}>
        <ButtonGroup spacing="2">
          <Button onClick={openRecipe} colorScheme="white" bgColor={'blue.400'}>
            Ver Receta
          </Button>
          <Button variant="ghost" colorScheme="blue">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default MealCard;
