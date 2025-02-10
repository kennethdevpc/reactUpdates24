import { useContext } from 'preact/hooks';
import todosContext from './todosContext';

export default function useTodos() {
  return useContext(todosContext); // useContext(todosContext);
}
