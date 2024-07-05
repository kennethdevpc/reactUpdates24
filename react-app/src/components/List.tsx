import { useState } from 'react';

type Props = {
  data: string[];
  onSelect?: (elemento: string) => void; //------?: para que sea opcional
};

function List({ data, onSelect }: Props) {
  //index es la variable, setIndex es la funcion que modifica la variable
  const [index, setIndex] = useState(1);
  console.log('index', index);
  const handleClick = (e: number, elemento: string) => {
    setIndex(e);
    onSelect?.(elemento); //------Uso de la funcion y le pongo "?." para que no me de error si no se le pasa la funcion
  };
  return (
    <div>
      <ul className="list-group">
        {data.map((elemento, i) => (
          <li
            onClick={() => handleClick(i, elemento)}
            key={elemento}
            className={`list-group-item ${i === index ? 'active' : ''}`}
            value={elemento}
          >
            {elemento}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
