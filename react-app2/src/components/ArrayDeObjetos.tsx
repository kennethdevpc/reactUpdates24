import React from 'react';

function ArrayDeObjetos() {
  const [product, setProducts] = React.useState([
    {
      id: 1,
      name: 'Pizza',
      price: 20,
    },
    {
      id: 2,
      name: 'Perro',
      price: 10,
    },
  ]);
  //----Agregando 1 objeto mas al array
  const handleClick = () => {
    setProducts([
      ...product,
      {
        id: 3,
        name: 'Hamburguesa',
        price: 30,
      },
    ]);
  };
  //----Agregando 1 objeto mas al array pero al principio
  const handleClick2 = () => {
    setProducts([
      {
        id: 4,
        name: 'Hamburguesa',
        price: 30,
      },
      ...product,
    ]);
  };
  //modificando un valor de un objeto:
  //en este caso se cambia el nombre del producto con id 2, se hace con map
  //ya que devuelve un nuevo array con los cambios, osea un nuevo array
  const handleClick3 = () => {
    const newArray = product.map((product) => {
      return product.id == 2 ? { ...product, name: 'perroArreglado' } : product;
    });
    setProducts(newArray);
  };
  //eliminando un objeto
  const handleClick4 = () => {
    const newArray = product.filter((product) => {
      return product.id !== 2;
    });
    setProducts(newArray);
  };

  return (
    <div>
      {product.map((product) => (
        <>
          <h1>{product.name}</h1>
          <h2>{product.price}</h2>
        </>
      ))}
      <button onClick={handleClick}>Add l final </button>
      <button onClick={handleClick2}>AddAl principio</button>
      <button onClick={handleClick3}>CambiarValorDeUndato</button>
      <button onClick={handleClick4}>eliminar</button>
    </div>
  );
}

export default ArrayDeObjetos;
