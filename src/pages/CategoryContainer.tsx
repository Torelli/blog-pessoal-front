import { useContext, useEffect, useState } from "react";
import Category from "../model/Category";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { find } from "../service/Service";
import CategoryAdmin from "../components/category/CategoryAdmin";
import PostCard from "../components/cards/PostCard";
import LoadingPostCard from "../components/cards/LoadingPostCard";
import PaginatedItems from "../components/pagination/PaginatedItems";

export default function CategoryContainer() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category>({} as Category);
  const posts = category.postagens;

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
    <div className="w-full py-24 md:px-8 md:min-h-[90vh]">
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
      <div className="mt-12 flex flex-col gap-4 items-center justify-center w-full">
        {isLoading ? (
          <>
            <LoadingPostCard />
            <LoadingPostCard />
          </>
        ) : posts != null && posts.length > 0 ? (
          <PaginatedItems category={category} items={posts} itemsPerPage={3} />
        ) : (
          <h3 className="flex flex-col gap-12 text-center text-3xl mt-16 text-gray-800">
            <i className="fa-regular fa-face-frown fa-2xl"></i>No posts yet...
          </h3>
        )}
      </div>
    </div>
  );
}
