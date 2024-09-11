import { createTodo, getTodos, updateTodo, deleteTodo } from "@/lib/todos";

const Todos = async () => {
  const todos = await getTodos();
  console.log("todos", todos);
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Todos</h2>
        <form action={createTodo}>
          <input
            type="text"
            placeholder="Enter a todo"
            name="title"
            className="border border-gray-500 p-2 rounded"
          ></input>
          <button className="border-b border-r border-gray-300 shadow-md px-2 rounded hover:shadow-lg hover:border">
            Make a todo
          </button>
        </form>
      </div>

      <div className="max-w-sm">
        {/* {{!todos}? */}
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
              <form action={deleteTodo}>
                <input type="hidden" name="id" value={todo.id}></input>
                <button className="border-b border-r border-gray-300 shadow-md px-2 hover:shadow-lg hover:border">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {/* :
        ''
        } */}
      </div>
    </div>
  );
};

export default Todos;
