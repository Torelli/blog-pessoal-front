import { Button } from "flowbite-react";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { create, find } from "../../service/Service";
import { AuthContext } from "../../contexts/AuthContext";
import { MutatingDots } from "react-loader-spinner";
import Category from "../../model/Category";
import Post from "../../model/Post";
import PostForm from "../forms/PostForm";
import { Bounce, toast } from "react-toastify";
import CustomIcon from "../icon/CustomIcon";

export default function ModalPostForm() {
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bodyValue, setBodyValue] = useState("# Title\n");
  const [categories, setCategories] = useState<Category[]>([]);
  const [post, setPost] = useState<Post>({} as Post);
  const navigate = useNavigate();

  useEffect(() => {
    if (post.id) navigate(`posts/${post.id}`);
  }, [post]);

  useEffect(() => {
    if (openModal) {
      document.body.classList.add("h-screen", "overflow-hidden");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("h-screen", "overflow-hidden");
      document.body.style.overflow = "visible";
    }
  }, [openModal]);

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

  async function createPost(e: ChangeEvent<HTMLFormElement>) {
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
    const newPost = { ...post, titulo, tema, texto, usuario: user };

    const loadingToast = toast.loading("Publishing post...", {
      position: "top-center",
      theme: "light",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Bounce,
    });

    try {
      setIsLoading(true);
      await create("/postagens", newPost, setPost, {
        headers: {
          Authorization: token,
        },
      });
      setIsLoading(false);
      setOpenModal(false);
      toast.update(loadingToast, {
        render: "Post published! ✏️",
        type: "default",
        isLoading: false,
        position: "top-center",
        theme: "light",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
        progressStyle: {
          background:
            "linear-gradient(to right, rgba(192, 38, 211, 1), rgba(59, 130, 246, 1))",
        },
        icon: CustomIcon,
      });
      e.target.titulo.value = "";
      e.target.tema.value = "3";
      setBodyValue("# Title\n");
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
      else {
        toast.update(loadingToast, {
          render: "Oops... Something went wrong, please try again later ✏️",
          type: "error",
          isLoading: false,
          position: "top-center",
          theme: "light",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
        console.log(error);
      }
      setIsLoading(false);
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpenModal(true)}
        className="fixed bottom-12 right-6 py-2 bg-gradient-to-br from-blue-500 to-fuchsia-600 rounded-full border-none hover:drop-shadow-lg hover:from-blue-600 hover:to-fuchsia-700 md:bottom-24 md:right-36 transition-all"
      >
        <i className="fa-solid fa-plus"></i>
      </Button>

      <div
        id="modal"
        className="group relative z-50 aria-[modal=true]:block aria-[modal=false]:hidden"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal={openModal}
      >
        {/*Background backdrop, show/hide based on modal state.*/}
        <div className="fixed inset-0 bg-gray-700 bg-opacity-80 backdrop-blur-sm group-aria-[modal=true]:opacity-100 group-aria-[modal=false]:opacity-0 transition-all"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            id="modal-out"
            className="flex min-h-full items-end justify-center p-0 text-center sm:items-center md:p-4"
          >
            <div
              id="modal-within"
              className="flex-1 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl md:my-8 w-full h-screen group-aria-[modal=true]:opacity:100 group-aria-[modal=false]:opacity-0 group-aria-[modal=true]:translate-y-0 md:group-aria-[modal=false]:translate-y-4 group-aria-[modal=false]:translate-y-0 group-aria-[modal=false]:scale-95 group-aria-[modal=true]:scale-100 md:max-w-6xl md:h-4/5 transition-all"
            >
              {isLoading ? (
                <>
                  <div className="bg-gray-100 px-4 py-3 flex justify-between sm:px-6">
                  <div className="flex items-center sm:justify-around gap-2">
                        <div className="flex bg-gradient-to-br from-blue-500 to-fuchsia-600 size-7 flex-shrink-0 items-center justify-center rounded-full">
                          <i className="fa-solid fa-plus text-white"></i>
                        </div>
                        <div className="text-center sm:mt-0 sm:text-left">
                          <h3
                            className="text-base font-semibold leading-6 text-gray-900"
                            id="modal-title"
                          >
                            Create a post
                          </h3>
                        </div>
                      </div>
                    <button
                      onClick={() => setOpenModal(false)}
                      type="button"
                      id="btn-close-modal"
                    >
                      <i className="fa-regular fa-circle-xmark text-gray-400 text-xl" />
                    </button>
                  </div>
                  <div className="w-full md:min-h-[60vh] flex items-center justify-center">
                    <MutatingDots
                      visible={true}
                      height="100"
                      width="100"
                      color="gray"
                      secondaryColor="gray"
                      radius="12.5"
                      ariaLabel="mutating-dots-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                </>
              ) : (
                categories.length > 0 && (
                  <>
                    <div className="bg-gray-100 px-4 py-3 flex justify-between sm:px-6">
                      <div className="flex items-center sm:justify-around gap-2">
                        <div className="flex bg-gradient-to-br from-blue-500 to-fuchsia-600 size-7 flex-shrink-0 items-center justify-center rounded-full">
                          <i className="fa-solid fa-plus text-white"></i>
                        </div>
                        <div className="text-center sm:mt-0 sm:text-left">
                          <h3
                            className="text-base font-semibold leading-6 text-gray-900"
                            id="modal-title"
                          >
                            Create a post
                          </h3>
                        </div>
                      </div>
                      <button
                        onClick={() => setOpenModal(false)}
                        type="button"
                        id="btn-close-modal"
                      >
                        <i className="fa-regular fa-circle-xmark text-gray-400 text-xl" />
                      </button>
                    </div>
                    <PostForm
                      bodyValue={bodyValue}
                      createPost={createPost}
                      handleCancel={() => setOpenModal(false)}
                      setBodyValue={setBodyValue}
                      categories={categories}
                      setCategories={setCategories}
                    />
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
