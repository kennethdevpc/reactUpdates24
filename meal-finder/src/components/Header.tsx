import { InputGroup, InputLeftElement, Stack, Input, Container, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { SearchForm } from '../types';
import { searchSchema } from '../schemas/search';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  onSubmit: (data: SearchForm) => void;
};

// function Header({ onSubmit }: Props) {
function Header({ onSubmit }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
  }); //---se agrega el useForm para poder utilizarlo en el formulario

  return (
    <Container mt="1" maxW="3xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <CiSearch color="blue" size={50} /> {/*--se agrega un icono*/}
          </InputLeftElement>
          <Input
            mr={5}
            focusBorderColor={errors.search ? 'red.500' : 'blue.500'}
            isInvalid={!!errors.search} //---se agrega para que se muestre el borde rojo si es invalido la informacion
            {...register('search')}
            type="tel"
            placeholder="Intena con 'chicken' o 'beans'"
          />
          <Button color="white" type="submit" bgColor="blue.400">
            Buscar
          </Button>
          Label
          {errors.search && <span>{errors?.search?.message}</span>}
        </InputGroup>
        {/* {formState?.errors?.search ? `${formState.errors.search.message}` : ''} */}
      </form>
    </Container>
  );
}

export default Header;
