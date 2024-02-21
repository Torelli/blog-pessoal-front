import { useContext } from "react";
import CategoryCard from "../components/cards/CategoryCard";
import CreateCategoryButton from "../components/cards/CreateCategoryButton";
import { AuthContext } from "../contexts/AuthContext";

export default function Categories() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="w-full py-20">
        <h2 className="text-2xl font-bold py-4 px-8 md:text-4xl md:mt-12">
          Explore our categories!
        </h2>
        <div className="p-4 grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] auto-rows-[minmax(250px,_1fr)] gap-6">
          {user.token !== "" && <CreateCategoryButton />}

          <CategoryCard title="teste" />
          <CategoryCard title="teste1" />
          <CategoryCard title="teste2" />
          <CategoryCard title="teste3" />
          <CategoryCard title="teste4" />
          <CategoryCard title="teste5" />
        </div>
      </div>
    </>
  );
}
