export default function LoadingCategoryCard() {
    return (
      <article className="bg-gray-100 border border-gray-300 border-l-8 rounded-lg shadow animate-pulse">
        <div
          className="group w-full h-full pt-8 pb-6 px-4 flex flex-col items-center justify-around text-gray-500 hover:text-gray-900 animate-pulse"
        >
          <div
            className="size-24 bg-gray-200 transition-all rounded-full animate-pulse"
          />
          <h3 className="bg-gray-200 w-1/2 h-4 font-bold transition-all animate-pulse"></h3>
        </div>
      </article>
    );
  }
  