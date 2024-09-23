import { Container, SkeletonText } from '@chakra-ui/react';
import React from 'react';

type Props = {};

function RecipeModalSkeleton({}: Props) {
  return (
    <Container>
      <SkeletonText spacing="4" mt="4" mb={5} noOfLines={1} skeletonHeight={8}></SkeletonText>
      <SkeletonText spacing="4" mb={5} noOfLines={1} skeletonHeight={208}></SkeletonText>
      <SkeletonText spacing="4" mt="4" noOfLines={3} skeletonHeight={1}></SkeletonText>
    </Container>
  );
}

export default RecipeModalSkeleton;
