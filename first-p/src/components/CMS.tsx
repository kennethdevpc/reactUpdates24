import { useState } from 'react';
import ContactForm from './ContactForm';
import ContactTable from './ContactTable';
import { contact } from '../schemas/contact';
function CMS() {
  const [contacts, setContacts] = useState<contact[]>([]);

  const addContact = (contact: contact) => {
    setContacts([{ ...contact, id: Math.random().toString() }, ...contacts]);
  };
  const deleteContact = (id: string) => {
    setContacts(contacts.filter((e) => e.id !== id));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <ContactForm onSubmit={addContact} />; hooo
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ContactTable contacts={contacts} />;
        </div>
      </div>
    </div>
  );
}

export default CMS;
