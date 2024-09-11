'use client';
import { useState, useEffect } from 'react';
type Todo = {
  id: number;
  title: string;
  createdAt: Date;
};

export const fetchTodos = async () => {
  const response = await fetch('/api/todo');
  const data = await response.json();
  console.log('data in TodoList : ', data);
  return data;
};

export default function TodoList({ refresh }: { refresh: number }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  useEffect(() => {
    async function getTodos() {
      const data = await fetchTodos();
      setTodos(data);
    }
    getTodos()
  }, [refresh]);


  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            onChange={() => {/* TODO: Implement update functionality */}}
          />
          {todo.title}
        </li>
      ))}
    </ul>
  );
}