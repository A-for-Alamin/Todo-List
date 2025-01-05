import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";

interface Todo {
  text: string;
  isCompleted: boolean;
  createAt: number;
}

function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [empty, setEmpty] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [filterTodo, setFilterTodo] = useState<
    "all" | "complete" | "incomplete"
  >("all");
  const [sortOrder, setSortOrder] = useState<"new-to-old" | "old-to-new">(
    "new-to-old"
  );

  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // Add Todo
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim() === "") return setEmpty(true);

    if (editIndex !== null) {
      const updatedTodos = todos.map((todo) =>
        todo.createAt === editIndex ? { ...todo, text: inputValue } : todo
      );
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      const newTodo: Todo = {
        text: inputValue,
        isCompleted: false,
        createAt: Date.now(),
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
    }

    setInputValue("");
    setEmpty(false);
  };

  // Toggle Task
  const toggleComplete = (createAt: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.createAt === createAt
        ? { ...todo, isCompleted: !todo.isCompleted }
        : todo
    );
    setTodos(updatedTodos);
  };

  // Delete Todo
  const deleteTodo = (createAt: number) => {
    const updatedTodos = todos.filter((todo) => todo.createAt !== createAt);
    setTodos(updatedTodos);
  };

  // Edit Todo
  const handleEdit = (createAt: number) => {
    setEditIndex(createAt);
    const editTodo = todos.find((todo) => todo.createAt === createAt);
    if (editTodo) {
      setInputValue(editTodo.text);
    }
  };

  // Filtered Todo List
  const filteredTodo = [...todos]
    .filter((todo) => {
      if (filterTodo === "complete") return todo.isCompleted;
      if (filterTodo === "incomplete") return !todo.isCompleted;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "new-to-old") return b.createAt - a.createAt;
      return a.createAt - b.createAt;
    });

  // Save todos to localStorage whenever todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <section className="h-screen bg-[url(/bg.svg)] flex justify-center items-center px-2 md:px-0">
        <div className="w-[27rem] space-y-5">
          <div className="bg-white p-5 rounded-lg">
            <h1 className="text-3xl font-bold mb-4 text-black/80 font-[Pacifico]">
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
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </form>
            <p
              className={`text-xs mt-1 ms-1 ${
                empty && "text-red-500 font-semibold"
              }`}
            >
              Please Enter your task...
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg max-h-[30rem] overflow-y-scroll todo-scroll">
            <div className="flex justify-between pb-3 border-b border-gray-600/50">
              <Select
                className="max-w-[7.6rem]"
                label="Filter"
                size="sm"
                labelPlacement="outside"
              >
                <SelectItem onPress={() => setFilterTodo("all")}>
                  All
                </SelectItem>
                <SelectItem onPress={() => setFilterTodo("complete")}>
                  Completed
                </SelectItem>
                <SelectItem onPress={() => setFilterTodo("incomplete")}>
                  Incomplet
                </SelectItem>
              </Select>

              <Select
                className="max-w-[7.6rem]"
                label="Sort by"
                size="sm"
                labelPlacement="outside"
                startContent={<BiSort />}
              >
                <SelectItem onPress={() => setSortOrder("new-to-old")}>
                  New to old
                </SelectItem>
                <SelectItem onPress={() => setSortOrder("old-to-new")}>
                  Old to new
                </SelectItem>
              </Select>
            </div>

            {filteredTodo.length === 0 ? (
              <p className="text-slate-600 text-center">No Task Yet ....</p>
            ) : (
              <div className="pt-2">
                <ul>
                  {filteredTodo.map((todo) => (
                    <li
                      key={todo.createAt}
                      className={`flex justify-between items-center mb-3 shadow-sm border px-2 py-2 rounded-md ${
                        todo.isCompleted ? "bg-rose-200" : "bg-green-200"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={todo.isCompleted}
                          onChange={() => toggleComplete(todo.createAt)}
                        />
                        <span
                          className={`${
                            todo.isCompleted
                              ? "line-through text-red-500 font-medium"
                              : "text-black"
                          }`}
                        >
                          {todo.text}
                        </span>
                      </div>
                      <div className="space-x-2">
                        <button
                          className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 transition-all rounded-md text-sm font-medium text-white"
                          onClick={() => handleEdit(todo.createAt)}
                        >
                          Edit
                        </button>
                        <button
                          className={`px-3 py-1.5 rounded-md text-sm font-medium text-white ${
                            todo.createAt !== editIndex
                              ? "bg-red-600 hover:bg-red-700 transition-all"
                              : "bg-red-900 cursor-not-allowed"
                          }`}
                          onClick={() => deleteTodo(todo.createAt)}
                          disabled={todo.createAt === editIndex}
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
