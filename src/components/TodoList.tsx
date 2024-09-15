"use client";
import { useState, useEffect } from "react";
import chalk from "chalk";
import '@/app/globals.css'

type Todo = {
  id: number;
  title: string;
  createdAt: Date;
};

export default function TodoList({ refresh }: { refresh: number }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updateInput, setUpdateInput] = useState("");

  const fetchTodos = async () => {
    const response = await fetch("/api/todo");
    const data = await response.json();
    console.log(chalk.bgRed.whiteBright.bold("data in TodoList : "), data);
    return data;
  };

  useEffect(() => {
    async function getTodos() {
      const data = await fetchTodos();
      setTodos(data);
    }
    getTodos();
  }, [refresh]);

  const handleUpdate = async (id: number, title: string) => {
    try {
      const response = await fetch("/api/todo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title }),
      });
      if (response.ok) {
        setTodos(
          todos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
        );
        setEditingId(null);
      } else {
        console.error("Failed to update todo");
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/todo?id=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className="border max-w-sm ">
          {editingId === todo.id ? (
            <div className="flex justify-between max-w-sm items-center">
              <input
                type="text"
                ref={(el: HTMLInputElement | null)=> {
                  if(el) {
                    el.focus()
                  }
                  return;
                }}
                value={updateInput}
                onChange={(e) => setUpdateInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUpdate(todo.id, updateInput);
                  }
                }}
                className="py-2 "
              />
              <div className="flex">
                <button
                  className="btn-custom"
                  onClick={() => handleUpdate(todo.id, updateInput)}
                >
                  Save
                </button>
                <button
                  className="btn-custom"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between max-w-sm items-center">
              <div className="py-2">{todo.title}</div>
              <div className="flex gap-2">
                <button
                  className="btn-custom"
                  onClick={() => {
                    setEditingId(todo.id);
                    setUpdateInput(todo.title);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn-custom"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
