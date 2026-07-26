import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./redux/features/counterSlice";

const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  const [num, setNum] = useState(5);

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-5">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Redux <span className="text-lime-400">Counter</span>
          </h1>

          <p className="text-zinc-400 mt-2 text-sm">
            Global State Management with Redux Toolkit
          </p>
        </div>

        {/* Counter */}
        <div className="bg-zinc-800 rounded-2xl py-8 text-center mb-8">
          <p className="text-zinc-400 text-sm uppercase tracking-widest">
            Current Count
          </p>

          <h2 className="text-6xl font-extrabold text-lime-400 mt-3">
            {count}
          </h2>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => dispatch(increment())}
            className="cursor-pointer rounded-xl bg-lime-500 py-3 font-semibold text-black transition hover:scale-105 hover:bg-lime-400"
          >
            + Increment
          </button>

          <button
            onClick={() => dispatch(decrement())}
            className="cursor-pointer rounded-xl bg-red-500 py-3 font-semibold text-white transition hover:scale-105 hover:bg-red-400"
          >
            - Decrement
          </button>
        </div>

        {/* Input */}

        <div className="space-y-4">
          <label className="text-sm text-zinc-300">
            Increase Counter by Amount
          </label>

          <input
            type="number"
            value={num}
            onChange={(e) => setNum(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white outline-none focus:border-lime-400"
          />

          <button
            onClick={() => dispatch(incrementByAmount(Number(num)))}
            className="w-full cursor-pointer rounded-xl bg-sky-500 py-3 font-semibold text-white transition hover:scale-105 hover:bg-sky-400"
          >
            Increase By Amount
          </button>
        </div>

        {/* Footer */}

        <p className="mt-8 text-center text-xs text-zinc-500">
          Built with React • Redux Toolkit • React Redux
        </p>
      </div>
    </div>
  );
};

export default App;