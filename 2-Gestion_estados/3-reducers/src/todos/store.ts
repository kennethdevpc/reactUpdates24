import { create } from 'zustand';
import { Todo } from './TodosProvider';

type todosStore = {
  todos: Todo[];

  add: (todo: Todo) => void;
  destroy: (id: number) => void;
};
const useTodosStore = create<todosStore>((set) => ({
  todos: [],
  add: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),
  destroy: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
}));

export default useTodosStore;
