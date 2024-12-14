import TitleContext from '../contexts/TitleContext';
import { Title } from '../types';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function TitleProvider({ children }: Props) {
  const [Title, setTitle] = useState<Title>({ title: 'hola' });

  function updateTitle() {
    setTitle({ title: Title.title == 'hola' ? 'adios' : 'hola' });
  }

  return (
    <TitleContext.Provider value={{ title: Title, updateTitle }}>{children}</TitleContext.Provider>
  );
}
