//creo la interfaz que contiene la forma en que se comporta ese parametro

// interface CardProps { //asegurarse que el nombre de la Interface tenga el Nombre del componente + Props o simplemente Props
interface Props {
  body: string;
}

function Card(props: Props) {
  const { body } = props; // se sugiere usar destructuring
  const width = { width: '440px' };
  return (
    <div className="card" style={width}>
      <div className="card-body">{body}</div>
    </div>
  );
}
export function CardBody() {
  return (
    <>
      <h5 className="card-title">Card title</h5>
      <p className="card-text">
        Some quick example text to build on the card title and make up the bulk of the card's
        content.
      </p>
      <a href="#" className="btn btn-primary">
        Go somewhere
      </a>
    </>
  );
}
export default Card;
