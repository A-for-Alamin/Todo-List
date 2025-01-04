import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <section className="h-screen bg-[url(vite.svg)] flex justify-center items-center">
        <div className="w-[24rem] space-y-5">
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
            {/* <p className="text-slate-600 text-center">No Task Yet ....</p> */}
            <div></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
