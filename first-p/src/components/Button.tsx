import React from 'react';

type variant = 'primary' | 'secondary' | 'danger' | 'warning';
type buttonType = 'button' | 'submit' | 'reset';
type Props = {
  variant?: variant;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: buttonType;
};

function Button({ children, variant = 'primary', onClick, type = 'button' }: Props) {
  return (
    <button type={type} onClick={onClick} className={`btn btn-${variant} m-3`}>
      {children}
    </button>
  );
}

export default Button;
