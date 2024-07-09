import { ReactNode } from 'react';
import styled from 'styled-components';
import { FaRegThumbsUp } from 'react-icons/fa';

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
`;

type Props = {
  sent?: boolean;
  onClick: () => void;
  children: ReactNode;
};

function Button({ sent, onClick }: Props) {
  return (
    <Btn sent={sent} onClick={onClick} disabled={sent}>
      {sent ? 'enviado' : 'enviar'}
      <FaRegThumbsUp color="red" size={50} />
    </Btn>
  );
}

export default Button;
