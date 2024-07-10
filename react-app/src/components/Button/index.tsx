import { ReactNode } from 'react';
import styled from 'styled-components';
import { FaRegThumbsUp } from 'react-icons/fa';
//modules.css
import styles from './Button.module.css';
import { IoIosSend } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa';

type BtnProps = {
  sent?: boolean;
};

const Btn = styled.button<BtnProps>`
  background-color: ${(props) => (props.sent ? 'red' : '#ff6347')};
  padding: 8px 12px;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e5bcb4;
  }
`;

type Props = {
  sent?: boolean;
  onClick: () => void;
  children: ReactNode;
};

function Button({ sent, onClick, children }: Props) {
  return (
    <div>
      <Btn sent={sent} onClick={onClick} disabled={sent}>
        <FaRegThumbsUp color="red" size={50} />
      </Btn>
      <br />
      <br />

      <button
        disabled={sent}
        onClick={onClick}
        className={[styles.btn, styles.btnPrimary].join(' ')}
      >
        {sent ? 'enviado' : `${children}`}
        {sent ? (
          <FaCheck color="green" className={styles.icon} />
        ) : (
          <IoIosSend color="blue" className={styles.icon} />
        )}
      </button>
    </div>
  );
}

export default Button;
