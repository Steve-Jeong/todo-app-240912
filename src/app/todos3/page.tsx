'use client'
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';
import { useState } from 'react';

type Todo = {
    id: number,
    content: string,
    completed: boolean,
  };

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  const onTodoAdded = () => {
    setRefresh(prev => prev + 1);
  };

  return (
    <main>
      <h1>Todo App</h1>
      <TodoForm onAddTodo={onTodoAdded} />
      <TodoList refresh={refresh} />
    </main>
  );
}