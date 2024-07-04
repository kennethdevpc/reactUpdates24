//creo la interfaz que contiene la forma en que se comporta ese parametro

import { ReactNode } from 'react';

// interface CardProps { //asegurarse que el nombre de la Interface tenga el Nombre del componente + Props o simplemente Props
interface Props {
  children: ReactNode;
  body?: string;
}

function Card(props: Props) {
  const { body, children } = props; // se sugiere usar destructuring
  const width = { width: '440px' };
  return (
    <div className="card" style={width}>
      <div className="card-body">{children}</div>
    </div>
  );
}
interface CardBodyProps {
  title: string;
  text?: string;
}

export function CardBody(props: CardBodyProps) {
  const { title, text } = props;

  return (
    <>
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{text}</p>
    </>
  );
}
export default Card;
