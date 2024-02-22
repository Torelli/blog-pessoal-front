import { ChangeEvent, useContext, useEffect, useState } from "react";
import CategoryForm from "../forms/CategoryForm";
import Category from "../../model/Category";
import { AuthContext } from "../../contexts/AuthContext";
import { redirect, useNavigate } from "react-router-dom";
import { create } from "../../service/Service";

export default function CreateCategoryButton({
  useCategories,
}: {
  useCategories: { categories; setCategories };
}) {
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;
  const navigate = useNavigate();
  const [category, setCategory] = useState<Category>({} as Category);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (token === "") {
      navigate("/login");
    }
  }, [token]);

  function handleCategory(e: ChangeEvent<HTMLInputElement>) {
    setCategory({ ...category, [e.target.name]: e.target.value });
  }

  async function createCategory(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await create("/temas", category, setCategory, {
        headers: {
          Authorization: token,
        },
      });
      useCategories.setCategories([...useCategories.categories, category]);
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
      else alert("Unknown error");
    }
  }

  return (
    <article className="bg-white border border-gray-300 border-l-8 border-l-fuchsia-600 rounded-lg shadow transition-all flex flex-col items-center justify-center">
      <button
        onClick={() => {
          if (isClicked) setIsClicked(false);
          else setIsClicked(true);
        }}
        className="group w-full pt-8 pb-6 px-4 flex flex-col items-center justify-center text-gray-500 hover:text-gray-800"
      >
        <i
          className={`fa-solid fa-circle-plus text-7xl group-hover:scale-105 ${
            isClicked && "rotate-45"
          } transition-all`}
        />
      </button>
      {isClicked ? (
        <CategoryForm
          createCategory={createCategory}
          handleCategory={handleCategory}
        />
      ) : (
        <h3 className="font-bold transition-all">New category</h3>
      )}
    </article>
  );
}
