import { createContext, ReactNode, useContext, useState } from "react";

export type TodosProviderType = {
  children: ReactNode;
};

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type todosContextTypes = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
};

export const todosContext = createContext<todosContextTypes | null>(null);

export const TodosProvider = ({ children }: TodosProviderType) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (task: string) => {
    setTodos((prevTodo) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
        },
        ...prevTodo,
      ];
      return newTodos;
    });
  };
  return (
    <todosContext.Provider value={{ todos, handleAddTodo }}>
      {children}
    </todosContext.Provider>
  );
};

// consumer
export const useTodos = () => {
  const todosConsumer = useContext(todosContext);

  return todosConsumer;
};
