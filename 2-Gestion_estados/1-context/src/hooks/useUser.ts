import { useContext } from 'react';
import userContext from '../contexts/UserContext';

function useUser() {
  return useContext(userContext);
}
export default useUser;
