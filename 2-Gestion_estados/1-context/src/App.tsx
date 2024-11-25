import './App.css';
import Dashboard from './components/Dashboard';
import MainContent from './components/MainContent';

import TodosProvider from './providers/TodosProvider';

function App() {
  return (
    <TodosProvider>
      <Dashboard />
      <MainContent />
    </TodosProvider>
  );
}

export default App;
