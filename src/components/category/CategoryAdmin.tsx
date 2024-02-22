import React, { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { create, destroy } from "../../service/Service";
import { AuthContext } from "../../contexts/AuthContext";
import Category from "../../model/Category";

export default function CategoryAdmin({
  category,
  setCategory,
  isLoading,
  id,
}: {
  category: Category;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
  isLoading: boolean;
  id: string;
}) {
  const [btnClicked, setBtnClicked] = useState(false);

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const navigate = useNavigate();

  function handleCategory(e: ChangeEvent<HTMLInputElement>) {
    setCategory({ ...category, [e.target.name]: e.target.value });
  }

  async function deleteCategory() {
    try {
      await destroy(`/temas/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      navigate("/categories");
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
      else alert("Unknown error");
    }
  }

  async function updateCategory() {
    try {
      await create("/temas", category, setCategory, {
        headers: {
          Authorization: token,
        },
      });
      setBtnClicked(false);
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
      else alert("Unknown error");
    }
  }
  return (
    <>
      <div className="flex gap-4">
        {btnClicked ? (
          <input
            onChange={handleCategory}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 hover:drop-shadow-md transition-all focus-visible:outline-0 focus-visible:border-blue-500 peer"
            placeholder="Category"
            type="text"
            name="descricao"
            id="descricao"
            defaultValue={category.descricao}
            required
            autoFocus
          />
        ) : (
          <h2
            className={`${
              isLoading && "w-32 py-6 bg-gray-200 animate-pulse"
            } text-4xl font-bold`}
          >
            {category.descricao}
          </h2>
        )}
        {btnClicked ? (
          <button
            onClick={updateCategory}
            className="border px-3 rounded-lg hover:text-gray-500 transition-all"
          >
            <i className="fa-solid fa-check"></i>
          </button>
        ) : (
          <>
            <button
              onClick={() => setBtnClicked(true)}
              className="border px-3 rounded-lg hover:text-gray-500 transition-all"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            <button
              onClick={deleteCategory}
              className="border px-3 rounded-lg hover:text-gray-500 transition-all"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </>
        )}
      </div>
    </>
  );
}
