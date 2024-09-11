'use client';
import { FormEvent } from 'react';

export default function TodoForm({onAddTodo}:{onAddTodo:() => void}) {
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    console.log('formData : ', formData)
    console.log('todo title : ', title)
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });
      if (response.ok) {
        form.reset();
        onAddTodo(); // Notify parent component to refresh the todo list
      } else {
        console.error('Failed to add todo');
      }
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Enter a new todo"
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}
