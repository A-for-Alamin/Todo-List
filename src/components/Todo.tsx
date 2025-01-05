import { useEffect, useState } from "react";

function TodoList() {
  const [inputValue, setInputValue] = useState("");

  const [todos, setTodos] = useState<string[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  //   Add Todo
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;

    const updatedTodos = [...todos, inputValue];
    setTodos(updatedTodos);
    setInputValue("");
  };

  // Delete Todo
  const deleteTodo = (i: number) => {
    const updatedTodos = todos.filter((_, index) => index !== i);

    setTodos(updatedTodos);
  };

  // Save todos to localStorage whenever todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <section className="h-screen bg-[url(vite.svg)] flex justify-center items-center">
        <div className="w-[27rem] space-y-5">
          <div className="bg-white p-5 rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-black/80">
              Smart To-Do List
            </h1>
            <form
              className="flex items-center bg-slate-300 rounded-md"
              onSubmit={handleFormSubmit}
            >
              <input
                type="text"
                className="w-full bg-transparent py-1.5 px-3 border-none outline-none"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <button className="bg-green-400 py-2 px-5 rounded-md hover:bg-green-500 transition-all duration-300">
                Add
              </button>
            </form>
            <p className="text-xs mt-1 ms-1">Please Inter your task...</p>
          </div>

          <div className="bg-white p-5 rounded-lg">
            {todos.length === 0 ? (
              <p className="text-slate-600 text-center">No Task Yet ....</p>
            ) : (
              <div>
                <ul>
                  {todos.map((todo, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center mb-3 shadow-md border px-2 py-2 rounded-md"
                    >
                      <div>{todo}</div>
                      <div className="space-x-2">
                        <button className="px-3 py-1.5 bg-red-600 rounded-md text-sm font-medium">
                          Edit
                        </button>
                        <button
                          className="px-3 py-1.5 bg-red-600 rounded-md text-sm font-medium"
                          onClick={() => deleteTodo(i)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default TodoList;
