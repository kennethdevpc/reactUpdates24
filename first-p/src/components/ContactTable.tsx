import React from 'react';
import { contact } from '../schemas/contact';

type Props = {
  contacts: contact[];
  onClick: (id: string) => void;
};

function ContactTable({ contacts, onClick }: Props) {
  return (
    <div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((e) => {
            return (
              <tr onClick={() => onClick(e.id)} key={e.id} style={{ cursor: 'pointer' }}>
                <th scope="row">{e.id}</th>
                <td>{e.name}</td>
                <td>{e.lastname}</td>
                <td>{e.email}</td>
                <td>{e.type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ContactTable;
