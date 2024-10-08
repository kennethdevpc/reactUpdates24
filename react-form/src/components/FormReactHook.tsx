import { useForm } from 'react-hook-form';
import { userSchema } from '../schemas/user';
import { z } from 'zod';

function FormReactHook() {
  //----usando react hook
  type Form = {
    name: string;
    lastname: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  // console.log(errors);
  // console.log(register('lastname'));

  const onsubmit = (data: Form) => {
    console.log('data', data);
    try {
      const x = userSchema.parse(data);
      console.log('sin eerror', x);
    } catch (error) {
      console.log((error as Error).message);
      if (error instanceof Error && 'errors' in error) {
        console.log('Form data is invalid', error.message);
      } else {
        console.log('Unknown error occurred', error);
      }
    }
    // console.log("informacion Obtenida desde el 'register'", data);
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input {...register('name')} type="text" id="name" className="form-control" />
        {/* {errors.name && <span>{errors?.name?.message}</span>} */}
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="form-label">
          Apellido
        </label>
        <input {...register('lastname')} type="text" id="lastname" className="form-control" />
      </div>
      <button className="btn btn-primary">Enviar</button>
    </form>
  );
}

export default FormReactHook;
