import React from 'react';

type variant = 'primary' | 'secondary' | 'danger' | 'warning';

type Props = {
  variant?: variant;
  children: React.ReactNode;
};

function Button({ children, variant = 'primary' }: Props) {
  return (
    <button type="submit" className={`btn btn-${variant} m-3`}>
      {children}
    </button>
  );
}

export default Button;
