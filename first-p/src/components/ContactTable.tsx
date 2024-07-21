import React from 'react';
import { contact } from '../schemas/contact';

type Props = {
  contacts: contact[];
};

function ContactTable({ contacts }: Props) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((e, i) => {
            return (
              <tr>
                <th scope="row">{i}</th>
                <td>{e.name}</td>
                <td>{e.lastname}</td>
                <td>{e.email}</td>
              </tr>
            );
          })}
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ContactTable;
