import { InputGroup, InputLeftElement, Stack, Input, Container, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CiSearch } from 'react-icons/ci';
import { SearchForm } from '../types';

type Props = {
  onSubmit: (data: SearchForm) => void;
};

function Header({ onSubmit }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SearchForm>(); //---se agrega el useForm para poder utilizarlo en el formulario
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
            {...register('search', {
              //---se agrega el register para que se pueda registrar el campo al "useForm"
              required: 'Este campo es requerido',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' },
            })}
            type="tel"
            placeholder="Intena con 'chicken' o 'beans'"
          />
          <Button color="white" type="submit" bgColor="blue.400">
            Buscar
          </Button>
          {errors.search && <span>{errors?.search?.message}</span>}
        </InputGroup>
        {/* {formState?.errors?.search ? `${formState.errors.search.message}` : ''} */}
      </form>
    </Container>
  );
}

export default Header;
