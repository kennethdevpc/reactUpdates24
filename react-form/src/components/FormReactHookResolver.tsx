import { useForm } from 'react-hook-form';
import { userSchema } from '../schemas/user';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { userForm } from '../schemas/user';
function FormReactHookResolver() {
  //----usando react hook
  // type Form = {
  //   name: string;
  //   lastname: string;
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userForm>({
    resolver: zodResolver(userSchema),
  });
  console.log('.....', errors);
  // console.log(register('lastname'));

  const onsubmit = (data: userForm) => {
    console.log('data', data);
    // console.log("informacion Obtenida desde el 'register'", data);
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input {...register('name')} type="text" id="name" className="form-control" />
        {errors.name && <span>{errors?.name?.message}</span>}
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="form-label">
          Apellido
        </label>
        <input {...register('lastname')} type="text" id="lastname" className="form-control" />
        {errors.lastname?.message ?? <p>{errors?.name?.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input {...register('amount')} type="text" id="amount" className="form-control" />
        {errors.amount?.message ?? <p>{errors?.amount?.message}</p>}
      </div>
      <button className="btn btn-primary">Enviar</button>
    </form>
  );
}

export default FormReactHookResolver;
