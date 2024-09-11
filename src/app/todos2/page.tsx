"use client";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/lib/todos";
import React, { useEffect, useState } from "react";

type TodoItem = {
  id: number;
  title: string;
  createdAt: Date;
};

const Todos = () => {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)

  }

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos : TodoItem[] = await getTodos();
      setTodos(fetchedTodos);
    };
    fetchTodos();
  }, []);

  const doCreateTodo = async (formData : FormData) => {
    await createTodo(formData);
    setInput('')
    const fetchedTodos: TodoItem[] = await getTodos();
    setTodos(fetchedTodos);
  }

  const doDeleteTodo = async (formData : FormData) => {
    await deleteTodo(formData);
    const fetchedTodos: TodoItem[] = await getTodos();
    setTodos(fetchedTodos);
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Todos</h2>
        <form action={doCreateTodo}>
          <input
            type="text"
            placeholder="Enter a todo"
            name="title"
            value={input}
            onChange={onInputChange}
            className="border border-gray-500 p-2 rounded"
          ></input>
          <button className="border-b border-r border-gray-300 shadow-md px-2 rounded er:shadow-lg hover:border">
            Make a todo
          </button>
        </form>
      </div>
      <div className="max-w-sm">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between border items-center"
          >
            <p className="py-2">{todo.title}</p>
            <div className="flex gap-2">
              <form action={updateTodo}>
                <input type="hidden" name="id" value={todo.id}></input>
                <button className="border-b border-r border-gray-300 shadow-md px-2 hover:shadow-lg hover:border">
                  Update
                </button>
              </form>
              <form action={doDeleteTodo}>
                <input type="hidden" name="id" value={todo.id}></input>
                <button className="border-b border-r border-gray-300 shadow-md px-2 hover:shadow-lg hover:border">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todos;
