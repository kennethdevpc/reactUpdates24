import { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Button from './components/Button';

function App() {
  type Product = {
    id: string;
    name: string;
    price: number;
  };

  const [products, setProducts] = useState([
    { id: Math.random().toString(), name: 'Product 1', price: 100 },
  ]);
  const addElementStart = () => {
    const newProduct = { id: Math.random().toString(), name: 'Product inicio', price: 400 };
    setProducts([newProduct, ...products]);
  };
  const addElementEnd = () => {
    const newProduct = { id: Math.random().toString(), name: 'Product End', price: 400 };
    setProducts([...products, newProduct]);
  };
  const deleteElementEnd = () => {
    const newProduct = products.slice(0, products.length - 1);
    setProducts(newProduct);
  };
  const empty = () => {
    setProducts([]);
  };

  return (
    <>
      <Button onClick={addElementStart}>Add Start</Button>
      <Button onClick={addElementEnd}>Add End</Button>
      <Button onClick={deleteElementEnd}>delete Element End</Button>
      <Button onClick={empty}>empty</Button>
      <ProductList products={products}></ProductList>
    </>
  );
}

export default App;
