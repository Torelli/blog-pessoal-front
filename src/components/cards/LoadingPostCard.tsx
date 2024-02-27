import React from "react";

export default function LoadingPostCard() {
  return (
    <div className="max-w-4xl w-full px-10 my-4 py-6 bg-gray-100 rounded-lg shadow-md animate-pulse">
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600 bg-gray-300 rounded-lg h-4 w-24 animate-pulse"></span>
        <div className="px-2 py-1 bg-gray-300 text-gray-100 font-bold rounded h-6 w-24 animate-pulse"></div>
      </div>
      <div className="mt-2 animate-pulse">
        <div className="text-2xl text-gray-700 font-bold bg-gray-300 rounded-lg h-6 w-28 animate-pulse"></div>
        <p className="mt-2 text-gray-600 bg-gray-300 rounded-lg h-4 animate-pulse"></p>
        <p className="mt-2 text-gray-600 bg-gray-300 rounded-lg w-3/4 h-4 animate-pulse"></p>
      </div>
      <div className="flex justify-between items-center mt-4 ">
        <div className="text-blue-600 hover:underline bg-gray-300 rounded-lg h-4 w-24 animate-pulse"></div>
        <div>
          <div className="flex items-center">
            <div className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block bg-gray-300 animate-pulse"></div>
            <h1 className="text-gray-700 font-bold bg-gray-300 rounded-lg w-24 h-4 animate-pulse"></h1>
          </div>
        </div>
      </div>
    </div>
  );
}
