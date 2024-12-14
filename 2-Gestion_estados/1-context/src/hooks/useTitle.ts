import { useContext } from 'react';
import TitleContext from '../contexts/TitleContext';

function useTitle() {
  return useContext(TitleContext);
}

export default useTitle;
