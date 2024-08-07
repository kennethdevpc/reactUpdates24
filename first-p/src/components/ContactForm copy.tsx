import React, { FormEvent } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { contactSchema } from '../schemas/contact'; //para el esquema de zod
import { contact } from '../schemas/contact'; //para el esquema de zod
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './Input';

function ContactForm() {
  // // const {
  // //   register,
  // //   handleSubmit,
  // //   formState: { errors },
  // // } = useForm<form>({
  // //   resolver: zodResolver(formSchema), //---este es el resolver de zod
  // // });
  // // console.log('.....', errors);

  const methods = useForm();

  // type userForm = {
  //   name: string;
  //   lastname: string;
  //   email: string;
  // };
  // // const onsubmit = (data: form) => {
  // //   console.log('submit');
  // //   console.log('data', data);
  // //   // console.log("informacion Obtenida desde el 'register'", data);
  // // };
  // const handleSubmit2 = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log('submit');
  //   console.log('data', errors.name?.message);
  // };

  return (
    // <form onSubmit={handleSubmit(onsubmit)}>
    //   <div className="mb-3">
    //     <label htmlFor="name" className="form-label">
    //       nambre
    //     </label>
    //     <input {...register('name')} type="text" id={`name`} className="form-control" />
    //   </div>
    // </form>
    <form onSubmit={methods.handleSubmit((data) => console.log('--------', data))}>
      <Input name="name">Nombre</Input>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input {...methods.register('name')} type="text" id="name" className="form-control" />
        {/* {errors.lastname?.message ?? <p>{errors?.name?.message}</p>} */}
      </div>
      {/* {errors.name && <span>{errors?.name?.message}</span>} */}

      {/* <div className="mb-3">
        <label htmlFor="lastname" className="form-label">
          Lastname
        </label>
        <input {...register('lastname')} type="text" id="lastname" className="form-control" />
        {errors.lastname?.message ?? <p>{errors?.name?.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input {...register('email')} type="text" id="email" className="form-control" />
        {errors.email?.message ?? <p>{errors?.email?.message}</p>}
      </div>

      <div className="form-floating">
        <select className="form-select" aria-label="Default select example">
          <option value="1">Familiar</option>
          <option value="2">Trabajo</option>
          <option value="3">Amigo</option>
          <option value="3">Otros</option>
        </select>
        <label htmlFor="floatingSelect">Texto flotante</label>
      </div> */}

      <div>
        <button type="submit" className="btn btn-primary m-3">
          Enviar
        </button>
        <button type="button" className="btn btn-secondary m-3">
          Limpiar
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
