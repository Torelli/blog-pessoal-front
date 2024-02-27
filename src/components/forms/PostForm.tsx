import MDEditor from "@uiw/react-md-editor";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import rehypeSanitize from "rehype-sanitize";
import Category from "../../model/Category";
import { find } from "../../service/Service";
import { AuthContext } from "../../contexts/AuthContext";
import Post from "../../model/Post";

export default function PostForm({
  handleCancel,
  createPost,
  bodyValue,
  setBodyValue,
  categories,
  setCategories,
  post,
  formId = "postForm",
}: {
  handleCancel: () => void;
  createPost: (e: ChangeEvent<HTMLFormElement>) => Promise<void>;
  bodyValue: string;
  setBodyValue: React.Dispatch<React.SetStateAction<string>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  post?: Post;
  formId?: string;
}) {
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState(
    post != undefined ? post.tema.id : 3
  );

  useEffect(() => {
    post != undefined && setBodyValue(post.texto);
  }, []);

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
      <div className="bg-white px-4 pt-5 pb-4 sm:px-6 sm:pt-0 flex flex-col items-center mt-2">
        <form
          onSubmit={createPost}
          id={formId}
          className="flex flex-col gap-8 w-full px-6 pt-6"
        >
          <div>
            <label
              htmlFor="titulo"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Title"
              defaultValue={post != undefined ? post.titulo : ""}
              onChange={(e) => {
                const newBody = bodyValue.split("\n");
                newBody[0] = `# ${e.target.value}`;
                setBodyValue(newBody.join("\n"));
              }}
              required
            />
          </div>
          <div>
            <label
              htmlFor="usuario"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <select
              id="tema"
              name="tema"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={category}
              onChange={(e) => setCategory(parseInt(e.target.value))}
            >
              {!isLoading &&
                categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.descricao}
                    </option>
                  );
                })}
            </select>
          </div>
          <div data-color-mode="light">
            <label
              htmlFor="texto"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Body
            </label>
            <MDEditor
              value={bodyValue}
              onChange={setBodyValue}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
                className: "prose max-w-none"
              }}
              aria-required
            />
          </div>
        </form>
      </div>
      <div className="bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          id="btn-add"
          type="submit"
          form={formId}
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
        >
          {post != undefined ? "Save" : "Post it!"}
        </button>
        <button
          id="btn-cancel"
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
