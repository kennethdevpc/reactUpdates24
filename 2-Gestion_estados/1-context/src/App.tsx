import './App.css';
import Dashboard from './components/Dashboard';
import MainContent from './components/MainContent';
import TitleProvider from './providers/TitleProvider';

import TodosProvider from './providers/TodosProvider';
import UserProvider from './providers/UserProvider';

function App() {
  return (
    <TodosProvider>
      <UserProvider>
        <TitleProvider>
          <Dashboard />
          <MainContent />
        </TitleProvider>
      </UserProvider>
    </TodosProvider>
  );
}

export default App;
