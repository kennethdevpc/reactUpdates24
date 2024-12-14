import useTodos from "../hooks/useTodos";
import useUser from "../hooks/useUser";

type Props = {};

function Dashboard({}: Props) {
  console.log("Dashboard");
  const { todos } = useTodos();
  const { user, toggleLogin } = useUser();
  return (
    <>
      <div>
        {user.name} {todos.length}
      </div>
      <button onClick={() => toggleLogin()}>Login</button>
    </>
  );
}

export default Dashboard;
