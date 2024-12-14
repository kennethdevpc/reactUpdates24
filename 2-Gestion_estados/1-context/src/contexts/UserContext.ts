import { createContext } from 'react';
import { User } from '../types';

type UserContextType = {
  user: User;
  toggleLogin: () => void;
};

export default createContext<UserContextType>({} as UserContextType);
