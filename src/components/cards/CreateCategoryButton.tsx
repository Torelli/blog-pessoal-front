export default function CreateCategoryButton() {
  return (
    <article className="bg-white border border-gray-300 border-l-8 border-l-fuchsia-600 rounded-lg shadow">
      <button
        className="group w-full h-full pt-8 pb-6 px-4 flex flex-col items-center justify-around text-gray-500 hover:text-gray-900"
      >
        <i className="fa-solid fa-circle-plus text-7xl group-hover:scale-105 transition-all" />
        <h3 className="font-bold transition-all">New category</h3>
      </button>
    </article>
  );
}
