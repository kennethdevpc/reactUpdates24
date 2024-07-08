import { ReactNode } from 'react';
import styles from './Button.module.css';
import styled from 'styled-components';

type BtnProps = {
  isLoading?: boolean;
};

const Btn = styled.button<BtnProps>`
  background-color: ${(props) => (props.isLoading ? 'red' : 'blue')};
  padding: 100px 30px;
  color: rgb(100, 60, 301);
`;

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
  // const className = [
  //   isLoading ? `btn btn-primary` : `btn btn-secondary`,
  //   styles.button,
  //   styles.padded,
  // ].join(' ');
  return (
    <Btn
      isLoading={isLoading}
      // style={styles}
      onClick={onClick}
      disabled={isLoading}
      // type="button"
      // className={[styles.button, styles.padded].join(' ')}
      // className={`${styles.button} ${styles.padded}`}
      // className={isLoading ? `btn btn-primary` : `btn btn-secondary`}
      // className={className}
    >
      {isLoading ? 'cargando...' : children}
    </Btn>
  );
}

export default Button;
