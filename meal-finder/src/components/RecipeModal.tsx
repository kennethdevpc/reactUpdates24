import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import RecipeModalSkeleton from './RecipeModalSkeleton';
import { MealDetails } from '../types';
import RecipeModalContent from './RecipeModalContent';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  data: MealDetails | undefined;
};

function RecipeModal({ isOpen, onClose, loading, data }: Props) {
  console.log('loading', loading);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {loading ? <RecipeModalSkeleton /> : data && <RecipeModalContent data={data} />}
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RecipeModal;
