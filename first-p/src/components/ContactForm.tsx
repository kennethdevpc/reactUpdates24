import React from 'react';

type Props = {};

function ContactForm({}: Props) {
  return (
    <>
      <form action="">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" id="name" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Lastname
          </label>
          <input type="text" id="lastname" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="text" id="email" className="form-control" />
        </div>

        <div className="form-floating">
          <select className="form-select" aria-label="Default select example">
            <option selected>select option</option>
            <option value="1">Familiar</option>
            <option value="2">Trabajo</option>
            <option value="3">Amigo</option>
            <option value="3">Otros</option>
          </select>
          <label htmlFor="floatingSelect">Texto flotante</label>
        </div>
        <div>
          <button type="button" className="btn btn-primary m-3">
            Enviar
          </button>
          <button type="button" className="btn btn-secondary m-3">
            Limpiar
          </button>
        </div>
      </form>
    </>
  );
}

export default ContactForm;
