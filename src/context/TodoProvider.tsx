import * as React from 'react';
import { ToDo } from '../models/ToDo';

interface TodoProviderI {
  data: ToDo[];
  addTodo: (name: string) => void;
  deleteTodo: (id: number) => void;
  completeTodo: (id: number) => void;
}

const initialValue: TodoProviderI = {
  data: [],
  addTodo: () => null,
  deleteTodo: () => null,
  completeTodo: () => null,
};

const ToDoContext = React.createContext(initialValue);

function ToDoReducer(state: any, action: any): TodoProviderI {
  const { id } = action.payload;
  switch (action.type) {
    case 'new-todo':
      const { name } = action.payload;
      return {
        ...state,
        data: [...state.data, { id: Date.now(), name, completed: false }],
      };
    case 'delete-todo':
      return {
        ...state,
        data: state.data.filter((toDo: ToDo) => toDo.id !== id),
      };
    case 'complete-todo':
      return {
        ...state,
        data: state.data.map((todo: ToDo) =>
          todo.id == id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const useToDo = () => {
  const context = React.useContext(ToDoContext);
  if (context === undefined) {
    throw new Error('useToDo must be used within a ToDoContext');
  }
  return context;
};

const TodoProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = React.useReducer(ToDoReducer, initialValue);

  const addTodo = (name: string) => {
    // call api ...
    dispatch({ type: 'new-todo', payload: { name } });
  };

  const deleteTodo = (id: number) => {
    // call api ...
    dispatch({ type: 'delete-todo', payload: { id } });
  };

  const completeTodo = (id: number) => {
    // call  api ...
    dispatch({ type: 'complete-todo', payload: { id } });
  };

  return (
    <ToDoContext.Provider
      value={{
        ...state,
        addTodo,
        deleteTodo,
        completeTodo,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export { TodoProvider, useToDo };
