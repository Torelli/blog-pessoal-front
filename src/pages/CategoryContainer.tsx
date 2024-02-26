import { useContext, useEffect, useState } from "react";
import Category from "../model/Category";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { find } from "../service/Service";
import CategoryAdmin from "../components/category/CategoryAdmin";
import PostCard from "../components/cards/PostCard";

export default function CategoryContainer() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category>({
    id: parseFloat(id as string),
    descricao: "",
  });

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    if (token === "") navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    async function getCategory() {
      try {
        setIsLoading(true);
        await find(`/temas/${id}`, setCategory, {
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
    getCategory();
  }, [handleLogout, token, id]);

  return (
    <div className="w-full py-24 md:px-8">
      {user.admin ? (
        <CategoryAdmin
          category={category}
          id={id as string}
          isLoading={isLoading}
          setCategory={setCategory}
        />
      ) : (
        <h2
          className={`${
            isLoading && "w-32 py-6 bg-gray-200 animate-pulse"
          } text-4xl font-bold ml-4 md:px-0`}
        >
          {category.descricao}
        </h2>
      )}
      <div className="mt-12 flex flex-col gap-4 items-center-justify-center w-full">
      </div>
    </div>
  );
}
