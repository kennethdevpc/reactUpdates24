import { useState } from 'react';

function App() {
  console.log('App');
  const [count, setCount] = useState(0);
  const [sent, setSent] = useState(0);
  const [user, setUser] = useState({ name: 'Carlos', lastName: 'perez' });
  console.log(new Date().getTime());
  const [products, setProducts] = useState([
    { name: 'shoes', price: 20 },
    { name: 'shirts', price: 30 },
  ]);

  const handleClick = () => {
    setProducts((previEstadoDeProducts) => [
      ...previEstadoDeProducts,
      { name: 'pants', price: 40 },
    ]);
  };
  const handleClick2 = () => {
    setSent(count + 1);
    console.log('count:', count);
    console.log('countsent:', sent);
  };

  return (
    <>
      {products.map((product) => (
        <h1>{product.name}</h1>
      ))}
      <h1>hhhhh</h1>
      {new Date().getTime()}
      <button onClick={handleClick}>Enviar</button>
      <button onClick={handleClick2}>Enviar2</button>
    </>
  );
}

export default App;
