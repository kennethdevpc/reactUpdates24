import React, { Children, useState } from 'react';
import { User } from '../types';
import UserContextoLlamadoComoquiera from '../contexts/UserContext';
type Props = {
  children: React.ReactNode;
};

function UserProvider({ children }: Props) {
  const [user, setUser] = useState<User>({ id: 0, name: 'kenneth' });

  const toggleLogin = () => {
    setUser({
      ...user,
      name: user.name == 'kenneth' ? 'pedro' : 'kenneth',
    });
  };

  return (
    <UserContextoLlamadoComoquiera.Provider value={{ user, toggleLogin }}>
      {children}
    </UserContextoLlamadoComoquiera.Provider>
  );
}

export default UserProvider;
