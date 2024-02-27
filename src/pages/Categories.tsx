import { useContext, useEffect, useState } from "react";
import CategoryCard from "../components/cards/CategoryCard";
import CreateCategoryButton from "../components/cards/CreateCategoryButton";
import { AuthContext } from "../contexts/AuthContext";
import { find } from "../service/Service";
import { useNavigate } from "react-router-dom";
import Category from "../model/Category";
import LoadingCategoryCardContainer from "../components/cards/LoadingCategoryCardContainer";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const navigate = useNavigate();

  useEffect(() => {
    if (token === "") navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    async function getCategories() {
      try {
        setIsLoading(true);
        await find("/temas", setCategories, {
          headers: { Authorization: token },
        });
        setIsLoading(false);
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        }
        setIsLoading(false);
      }
    }
    getCategories();
  }, [categories.length]);

  return (
    <>
      <div className="w-full py-20">
        <h2 className="text-2xl font-bold py-4 px-8 md:text-4xl md:mt-12">
          Explore our categories!
        </h2>
        <div className="p-4 grid grid-cols-[repeat(auto-fill,_minmax(250px,1fr))] auto-rows-[minmax(250px,_1fr)] gap-6">
          {isLoading ? (
            <LoadingCategoryCardContainer />
          ) : categories.length === 0 ? (
            <>
              {user.admin ? (
                <CreateCategoryButton
                  useCategories={{ categories, setCategories }}
                />
              ) : (
                <h3 className="w-full text-center text-xl font-bold py-4 px-8 md:text-4xl md:mt-12">
                  No categories yet...
                </h3>
              )}
            </>
          ) : (
            <>
              {user.admin && (
                <CreateCategoryButton
                  useCategories={{ categories, setCategories }}
                />
              )}
              <CategoryCard />
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
