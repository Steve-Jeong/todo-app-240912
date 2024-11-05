import { createTodo, getTodos, updateTodo, deleteTodo } from "@/lib/todos";
import "@/app/globals.css"

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
            className="border border-gray-500 p-2 rounded mr-2"
          ></input>
          <button className="btn-custom">
            Make a todo
          </button>
        </form>
      </div>

      <div className="max-w-sm">
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex justify-between border items-center"
            >
              {/* <p className="py-2">{todo.title}</p> */}
              <div className="flex gap-2">
                <form action={updateTodo} className="flex justify-between w-full">
                  <input type="hidden" name="id" value={todo.id} />
                  <input
                    type="text"
                    name="title"
                    defaultValue={todo.title}
                    className="border border-gray-300 p-1 mr-2 w-full"
                  />
                  <button className="btn-custom">
                    Update
                  </button>
                </form>
                <form action={deleteTodo}>
                  <input type="hidden" name="id" value={todo.id} />
                  <button className="btn-custom">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))
        ) : (
          <p>No todos found.</p>
        )}
      </div>
    </div>
  );
};

export default Todos;
