import { FormEvent, useState } from 'react';

function FormControlled() {
  const [user, setUser] = useState({ name: 'nombre', lastname: 'apellido' });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('el user kenneth', user);
    const data = {};
    console.log(data);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('escribiendo', event.target.name, event.target.value);
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          name="name"
          type="text"
          id="name"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastname" className="form-label">
          Apellido{' '}
        </label>
        <input
          //forma larga
          // onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          //forma corta
          onChange={(e) => handleChange(e)}
          type="text"
          id="lastname"
          name="lastname"
          value={user.lastname}
          className="form-control"
        />
      </div>
      <button className="btn btn-primary">Enviar</button>
    </form>
  );
}

export default FormControlled;
