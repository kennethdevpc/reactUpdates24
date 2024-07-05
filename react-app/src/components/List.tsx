import { useState } from 'react';

type Props = {
  data: string[];
};

function List({ data }: Props) {
  //index es la variable, setIndex es la funcion que modifica la variable
  const [index, setIndex] = useState(1);
  console.log('index', index);
  const handleClick = (e: number) => {
    console.log('evento', e);
    setIndex(e);
    console.log('evento', e);
  };
  return (
    <div>
      <ul className="list-group">
        {data.map((elemento, i) => (
          <li
            onClick={() => handleClick(i)}
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
