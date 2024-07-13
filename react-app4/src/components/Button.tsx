import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick: () => void;
};

function Button({ onClick, children }: Props) {
  return <button onClick={onClick}>{children}</button>;
}

export default Button;
