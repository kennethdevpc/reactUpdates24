import MainContent from "./components/MainContent";
import Dashboard from "./components/Dashboard";
import TodosProvider from "./providers/TodosProvider";
import UserProvider from "./providers/UserProvider";

function App() {
  console.log("App");
  return (
    <TodosProvider>
      <UserProvider>
        <Dashboard />
        <MainContent />
      </UserProvider>
    </TodosProvider>
  );
}

export default App;
