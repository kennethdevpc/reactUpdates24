import { FormEvent, useRef } from 'react';

function Form() {
  const nameRef = useRef<HTMLInputElement>(null); //recibe un null o un html inicial
  const lastnameRef = useRef<HTMLInputElement>(null); //recibe un null o un html inicial

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // const form = event.target as HTMLFormElement;
    // const input = form.elements.namedItem('lastname') as HTMLInputElement;
    // console.log('el input', input.value);
    const data = {
      name: nameRef.current?.value,
      lastname: lastnameRef.current?.value,
    };
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input ref={nameRef} name="nombre" type="text" id="name" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="form-label">
          Apellido{' '}
        </label>
        <input ref={lastnameRef} type="text" id="lastname" className="form-control" />
      </div>
      <button className="btn btn-primary">Enviar</button>
    </form>
  );
}

export default Form;
