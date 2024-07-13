import { useState } from 'react';
import './App.css';
import ProductDashboard from './components/ProductDashboard';
import ProductList from './components/ProductList';
import Button from './components/Button';

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ]);
  const handleClick = () => {
    const newProduct = { id: 4, name: 'Product 4', price: 400 };
    setProducts([...products, newProduct]);
  };

  return (
    <>
      <ProductDashboard amount={products.length}> </ProductDashboard>
      <Button onClick={handleClick}>Enviar</Button>
      <ProductList products={products}></ProductList>
    </>
  );
}

export default App;
