import ContactForm from './ContactForm';
import ContactTable from './ContactTable';
function CMS() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <ContactForm />; hooo
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ContactTable />;
        </div>
      </div>
    </div>
  );
}

export default CMS;
