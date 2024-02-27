import { Link } from "react-router-dom";
import Category from "../../model/Category";

export default function CategoryCard({ category }: { category?: Category }) {
  return (
    <article className="bg-white border border-gray-300 border-l-8 border-l-blue-500 rounded-lg shadow">
      <Link
        to={category != undefined ? `/categories/${category.id}` : "/posts"}
        className="group w-full h-full pt-8 pb-6 px-4 flex flex-col items-center justify-around text-gray-500 hover:text-gray-900"
      >
        <img
          className="size-24 group-hover:scale-105 transition-all"
          src={category != undefined ? `https://api.dicebear.com/7.x/icons/svg?seed=${category.descricao}&radius=50&backgroundType=gradientLinear&backgroundColor=c026d3,3b82f6` : "https://api.dicebear.com/7.x/icons/svg?icon=globe&radius=50&backgroundType=gradientLinear&backgroundColor=c026d3,3b82f6"}
          alt="avatar"
        />
        <h3 className="font-bold transition-all">{category != undefined ? category.descricao : "Fresh posts"}</h3>
      </Link>
    </article>
  );
}
