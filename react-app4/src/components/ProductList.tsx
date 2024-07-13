import React from 'react';

type Product = {
  id: string;
  name: string;
  price: number;
};

type Props = {
  products: Product[];
};

function ProductList({ products }: Props) {
  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <span>{product.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
