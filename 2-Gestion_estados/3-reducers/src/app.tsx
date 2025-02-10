import './app.css';
import MainContent from './components/MainContent';
import TodosProvider from './todos/TodosProvider';

export function App() {
  // const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    //----logica para usar reducer
    <TodosProvider>
      <MainContent />
    </TodosProvider>
  );
}
