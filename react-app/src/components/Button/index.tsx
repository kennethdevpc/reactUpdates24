import { ReactNode } from 'react';
import styles from './Button.module.css';

type Props = {
  isLoading?: boolean;
  onClick: () => void;
  children: ReactNode;
};

// const styles = {
//   margin: '10px',
//   backgroundColor: 'red',
// };

function Button({ isLoading, children, onClick }: Props) {
  return (
    <button
      // style={styles}
      onClick={onClick}
      disabled={isLoading}
      type="button"
      className={[styles.button, styles.padded].join(' ')}
      // className={`${styles.button} ${styles.padded}`}
      // className={isLoading ? `btn btn-primary` : `btn btn-secondary`}
    >
      {isLoading ? 'cargando...' : children}
    </button>
  );
}

export default Button;
