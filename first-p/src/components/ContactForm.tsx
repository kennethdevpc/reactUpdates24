import React, { FormEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formSchema } from '../schemas/form'; //para el esquema de zod
import { form } from '../schemas/form'; //para el esquema de zod
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';
import Button from './Button';

type Props = {};

function ContactForm({}: Props) {
  const methods = useForm<form>({ resolver: zodResolver(formSchema) }); //---video
  const {
    handleSubmit,
    formState: { errors },
  } = methods;
  const onsubmit = (data: form) => {
    console.log('submit');
    console.log('data', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Input name="name">Nombre</Input>
        {errors.name?.message ?? <p>{errors?.name?.message}</p>}
        <Input name="lastname">Apellido</Input>
        {errors.lastname?.message ?? <p>{errors?.lastname?.message}</p>}
        <Input name="email">Correo</Input>
        {errors.email?.message ?? <p>{errors?.email?.message}</p>}

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
