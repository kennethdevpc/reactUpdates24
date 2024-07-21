import React, { FormEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { contactSchema } from '../schemas/contact'; //para el esquema de zod
import { contact } from '../schemas/contact'; //para el esquema de zod
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';
import Button from './Button';
import Select from './Select';
import { contactTypeOptions } from '../schemas/contact';

type Props = {
  onSubmit: (contact: contact) => void;
};

function ContactForm({ onSubmit }: Props) {
  const methods = useForm<contact>({ resolver: zodResolver(contactSchema) }); //---video
  const { handleSubmit } = methods;
  // const onsubmit = (data: contact) => {
  //   console.log('submit');
  //   console.log('data', data);
  //   onSubmit(data);
  //   // setContacts([...contacts, data]);
  // };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name">Nombre</Input>
        <Input name="lastname">Apellido</Input>
        <Input name="email">Correo</Input>
        <Select
          options={contactTypeOptions}
          defaultMessage={'--selecciona el typo--'}
          label={'Tipo '}
          name={'type'}
        ></Select>

        <Button variant={'primary'}>Enviar</Button>
      </form>
    </FormProvider>
  );
}

export default ContactForm;
