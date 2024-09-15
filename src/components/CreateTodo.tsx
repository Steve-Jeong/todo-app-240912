"use client"
import { createTodo } from '@/lib/todos'

const CreateTodo = () => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-bold">Todos</h2>
      <form action={createTodo}>
        <input
          type="text"
          placeholder="Enter a todo"
          name="title"
          className="border border-gray-500 p-2 rounded"
        ></input>
        <button className="border-b border-r border-gray-300 shadow-md px-2 rounded er:shadow-lg hover:border">
          Make a todo
        </button>
      </form>
    </div>
  )
}

export default CreateTodo