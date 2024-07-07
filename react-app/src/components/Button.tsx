import { ReactNode } from 'react';

type Props = {
  isLoading?: boolean;
  onClick: () => void;
  children: ReactNode;
};

const styles = {
  margin: '10px',
  backgroundColor: 'red',
};

function Button({ isLoading, children, onClick }: Props) {
  return (
    <button
      style={styles}
      onClick={onClick}
      disabled={isLoading}
      type="button"
      className={isLoading ? `btn btn-primary` : `btn btn-secondary`}
    >
      {isLoading ? 'cargando...' : children}
    </button>
  );
}

export default Button;
