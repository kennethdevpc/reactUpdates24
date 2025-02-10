export type Todo = {
  //----es un typo para el elemento de la lista
  id: number;
  name: string;
};
//------Esto es el tipo con el que vendra la informacion del dispatch
type addAction = {
  type: 'ADD';
  todo: Todo;
};
type deleteAction = {
  type: 'DELETE';
  todoId: number;
};
//---como el action recibe un objeto con el typo y el payload, entonces se puede hacer asi:
//---type Action = {type: "DELETE"  ;  todoId: number;} | {  type: "DELETE"  ;  todoId: number;};
//---de una manera mas ordenaa para recibir 2 tipos pues se hace asi
export type TodoAction = addAction | deleteAction;

export default (todos: Todo[], action: TodoAction) => {
  switch (action.type) {
    case 'ADD':
      return [...todos, { ...action.todo, id: action.todo.id * Math.random() }];
    case 'DELETE':
      return [...todos.filter((todo) => todo.id !== action.todoId)];
  }
  return todos; //----siempre hay que retornar el estado
};
