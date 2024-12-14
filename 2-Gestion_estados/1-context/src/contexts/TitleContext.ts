import { createContext } from 'react';
import { Title } from '../types';

interface TitleContextType {
  title: Title;
  updateTitle: () => void;
}

export default createContext<TitleContextType>({} as TitleContextType);
