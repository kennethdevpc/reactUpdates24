import { useForm } from 'react-hook-form';

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
  console.log(errors);
  console.log(register('lastname'));

  const onsubmit = (data: Form) => console.log("informacion Obtenida desde el 'register'", data);

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          {...register('name', {
            required: 'Este campo es requerido',
            minLength: { value: 2, message: 'Mínimo 2 caracteres' },
            maxLength: { value: 10, message: 'No más de 10 caracteres' },
            validate: (value) => (value.length < 4 ? 'largo minimo 4' : true),
          })}
          type="text"
          id="name"
          className="form-control"
        />
        {errors.name && <span>{errors?.name?.message}</span>}
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
