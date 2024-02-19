import React from "react";

export default function Home() {
  return (
    <div className="w-full py-12 flex flex-col justify-center items-center gap-2">
      <h2 className="text-7xl font-extrabold">Welcome!</h2>
      <span>Express your thoughts and opinions!</span>
      <button className="bg-transparent mt-6 hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded">
        View posts
      </button>
    </div>
  );
}
