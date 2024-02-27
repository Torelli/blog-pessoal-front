import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Post from "../model/Post";
import { AuthContext } from "../contexts/AuthContext";
import { create, destroy, find } from "../service/Service";
import MDEditor from "@uiw/react-md-editor";
import LoadingPost from "../components/post/LoadingPost";
import useOutsideClick from "../hooks/useOutsideClick";
import PostForm from "../components/forms/PostForm";
import Category from "../model/Category";
import ModalDeletePost from "../components/modal/ModalDeletePost";

export default function PostContainer() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>({} as Post);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bodyValue, setBodyValue] = useState("# Title\n");
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const ref = useOutsideClick(handleClickOutside);

  function handleClickOutside() {
    setIsOpen(false);
  }

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    if (token === "") navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    async function getPost() {
      try {
        setIsLoading(true);
        await find(`/postagens/${id}`, setPost, {
          headers: { Authorization: token },
        });
        setIsLoading(false);
        setBodyValue(post.texto);
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        }
        setIsLoading(false);
      }
    }
    getPost();
  }, [handleLogout, token, id]);

  useEffect(() => setIsOpen(false), [isEditing]);

  async function updatePost(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const titulo = e.target.titulo.value;
    const tema = {
      id: parseInt(e.target.tema.value),
      descricao: categories.filter(
        (category) => category.id === parseInt(e.target.tema.value)
      )[0].descricao,
    };
    const newBody = bodyValue.split("\n");

    if (newBody[0] != `# ${titulo}`) newBody.unshift(`# ${titulo}`);

    const texto = newBody.join("\n");

    const updatedPost = { ...post, titulo, tema, texto };

    try {
      setIsLoading(true);
      await create("/postagens", updatedPost, setPost, {
        headers: {
          Authorization: token,
        },
      });
      setIsLoading(false);
      setIsEditing(false);
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
      else {
        alert("Unknown error");
        console.log(error);
      }
      setIsLoading(false);
    }
  }

  async function deletePost() {
    try {
      await destroy(`/postagens/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      navigate("/posts");
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
      else alert("Unknown error");
    }
  }

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      data-color-mode="light"
      className="flex justify-center w-full py-24 md:px-8 md:min-h-[90vh]"
    >
      {isLoading ? (
        <LoadingPost />
      ) : (
        <div className="flex flex-col min-h-[70vh] justify-between max-w-6xl w-full py-4 px-8 border rounded-md relative">
          {(user.admin ||
            (post.usuario != undefined && post.usuario.id === user.id)) && (
            <div className="absolute w-full text-right right-8">
              <button
                onClick={() => setIsOpen(true)}
                className="hover:bg-gray-100 rounded-lg px-2"
              >
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </button>
              {}
              <div
                className={`${
                  !isOpen && "hidden"
                } bg-white w-24 border absolute right-2`}
              >
                <ul ref={ref} className="text-left">
                  <li className="items-center hover:bg-gray-100 p-1 pl-2">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex gap-2 w-full"
                    >
                      <i className="fa-regular fa-pen-to-square"></i> Edit
                    </button>
                  </li>
                  <li className="items-center hover:bg-gray-100 p-1 pl-2">
                    <button
                      onClick={() => {
                        setIsDeleting(true);
                      }}
                      className="flex gap-2 w-full"
                    >
                      <i className="fa-regular fa-trash-can"></i> Delete
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
          {isEditing ? (
            <PostForm
              bodyValue={bodyValue}
              createPost={updatePost}
              categories={categories}
              setCategories={setCategories}
              handleCancel={() => setIsEditing(false)}
              setBodyValue={setBodyValue}
              post={post}
              formId="editForm"
            />
          ) : (
            <MDEditor.Markdown
              source={post.texto}
              style={{ whiteSpace: "pre-wrap" }}
            />
          )}

          <div className="flex justify-between flex-row-reverse mt-8 text-sm">
            <div>
              <span className="italic">By </span>
              <Link
                className="font-bold"
                to={
                  post.usuario != undefined ? `/users/${post.usuario.id}` : ""
                }
              >
                {post.usuario != undefined && post.usuario.nome}
              </Link>
            </div>
            <div>{new Date(post.data as string).toDateString()}</div>
          </div>
        </div>
      )}
      {isDeleting && <ModalDeletePost openModal={isDeleting} setOpenModal={() => setIsDeleting(false)} handleDelete={deletePost} />}
    </div>
  );
}
