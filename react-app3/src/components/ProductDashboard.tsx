import React, { ReactNode } from 'react';

type Props = {
  amount: number;
  children: ReactNode;
};

function ProductDashboard({ amount }: Props) {
  return <div>El amount es {amount}</div>;
}

export default ProductDashboard;
