import React from 'react';

function Anidadas() {
  const [product, setProducts] = React.useState({
    name: 'Pizza',
    price: 20,
    addreess: {
      street: 'calle 1',
      number: 123,
    },
  });
  const handleClick = () => {
    setProducts({
      ...product,
      addreess: {
        ...product.addreess,
        street: 'calle 6',
      },
    });
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <h2>{product.addreess.street}</h2>
      <h2>{product.addreess.number}</h2>
      <button onClick={handleClick}>Enviar</button>
    </div>
  );
}

export default Anidadas;
