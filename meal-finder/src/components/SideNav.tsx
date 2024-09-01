import React from 'react';
import { Category } from '../types';
import { Box, Heading, Link, SkeletonText, StackDivider, VStack } from '@chakra-ui/react';
import { color } from 'framer-motion';

type Props = {
  categories: Category[];
  loading: boolean;
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
};

const selectedProps = {
  bgColor: 'blue.400',
  color: 'white',
  fontWeight: 'bold',
};
function SideNav({ categories, loading, selectedCategory: selected, setSelectedCategory }: Props) {
  return loading ? (
    <SkeletonText mt="4" noOfLines={8} spacing="4" skeletonHeight="2" />
  ) : (
    <>
      <Heading color="green.400" fontSize={12} fontWeight="bold" mb="4">
        CATEGORIAS
      </Heading>
      <VStack align="stretch">
        {categories.map((category) => (
          <Link
            onClick={() => setSelectedCategory(category)}
            _hover={{
              textDecoration: 'none',
              color: 'white',
              backgroundImage:
                'radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,94,247,1) 17.8%, rgba(2,245,255,1) 100.2% );',
            }}
            key={category.strCategory}
            h="40px"
            bg="yellow.200"
            px={2}
            py={1}
            borderRadius="5"
            {...(selected.strCategory === category.strCategory && selectedProps)}
          >
            {category.strCategory}
          </Link>
        ))}
      </VStack>
    </>
  );
}

export default SideNav;
