import { useForm } from 'react-hook-form';

function FormReactHook() {
  //----usando react hook
  const form = useForm();
  console.log(form);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input name="name" type="text" id="name" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="form-label">
          Apellido
        </label>
        <input type="text" id="lastname" name="lastname" className="form-control" />
      </div>
      <button className="btn btn-primary">Enviar</button>
    </form>
  );
}

export default FormReactHook;
