import React, { FormEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { contactSchema } from '../schemas/contact'; //para el esquema de zod
import { contact } from '../schemas/contact'; //para el esquema de zod
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';
import Button from './Button';

type Props = {};

function ContactForm({}: Props) {
  const methods = useForm<contact>({ resolver: zodResolver(contactSchema) }); //---video
  const { handleSubmit } = methods;
  const onsubmit = (data: contact) => {
    console.log('submit');
    console.log('data', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Input name="name">Nombre</Input>
        <Input name="lastname">Apellido</Input>
        <Input name="email">Correo</Input>

        <div className="form-floating">
          <select className="form-select" aria-label="Default select example">
            {/* <option selected>select option</option> */}
            <option value="1">Familiar</option>
            <option value="2">Trabajo</option>
            <option value="3">Amigo</option>
            <option value="3">Otros</option>
          </select>
          <label htmlFor="floatingSelect">Texto flotante</label>
        </div>

        <Button variant={'primary'}>Enviar</Button>
      </form>
    </FormProvider>
  );
}

export default ContactForm;
