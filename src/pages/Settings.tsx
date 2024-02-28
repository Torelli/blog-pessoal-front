import { ChangeEvent, useContext, useEffect, useState } from "react";
import ModalDelete from "../components/modal/ModalDelete";
import { create, destroy } from "../service/Service";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import User from "../model/User";
import LoadingPost from "../components/post/LoadingPost";
import { toasts } from "../util/toasts";

export default function Settings() {
    const { user, handleLogout } = useContext(AuthContext);
    const token = user.token;

  const userSettings = { ...user as User };
  if (user.foto === null) userSettings.foto = "";

  const [isPublicOpen, setIsPublicOpen] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [changePicture, setChangePicture] = useState(false);
  const [newUser, setNewUser] = useState<User>(userSettings as User);
  const avatar = user.usuario;
  const navigate = useNavigate();

  useEffect(() => {
    if (token === "") navigate("/login");
  }, [token, navigate]);

  async function updateUser(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await create("/usuarios/atualizar", newUser, setNewUser, {
        headers: {
          Authorization: token,
        },
      });
      setIsLoading(false);
      setChangePicture(false);
      handleLogout();
      //handleLogin(newUser as UserLogin);
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
      else {
        toasts("Oops... Something went wrong, try again later", "error");
        console.log(error);
      }
      setIsLoading(false);
    }
  }

  async function deleteUser() {
    try {
      await destroy(`/usuarios/${user.id}`, {
        headers: {
          Authorization: token,
        },
      });
      handleLogout();
    } catch (error: any) {
      if (error.toString().includes("403")) handleLogout();
      else toasts("Oops... Something went wrong, try again later", "error");
    }
  }

  function updateState(e: React.ChangeEvent<HTMLInputElement>) {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="mt-20 bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row">
      {isLoading ? (
        <LoadingPost />
      ) : (
        <>
          <aside className="py-4 md:w-1/3 lg:w-1/4 md:block">
            <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-blue-100 top-12">
              <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
              <button
                onClick={() => setIsPublicOpen(true)}
                className={`flex items-center px-3 py-2.5 font-bold bg-white ${
                  isPublicOpen && "text-blue-900 border rounded-full"
                }`}
              >
                Public Profile
              </button>
              <button
                onClick={() => setIsPublicOpen(false)}
                className={`flex items-center px-3 py-2.5 font-bold bg-white ${
                  !isPublicOpen && "text-blue-900 border rounded-full"
                }`}
              >
                Account Settings
              </button>
            </div>
          </aside>
          <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
            {isPublicOpen ? (
              <form onSubmit={updateUser} className="p-2 md:p-4">
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                  <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                    Public Profile
                  </h2>
                  <div className="grid max-w-2xl mx-auto mt-8">
                    <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                      <div className="flex flex-col gap-8 items-center">
                        <img
                          className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-blue-300"
                          src={
                            user.foto != undefined || user.foto != null
                              ? user.foto
                              : `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${avatar != undefined && avatar.split("@").shift()}`
                          }
                          alt="Bordered avatar"
                        />
                        <input
                          type="text"
                          id="foto"
                          name="foto"
                          className={`border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                            !changePicture && "invisible"
                          }`}
                          placeholder="Image url"
                          value={newUser.foto}
                          onChange={updateState}
                        />
                      </div>
                      <div className="flex flex-col space-y-5 sm:ml-8">
                        <button
                          onClick={() => setChangePicture(true)}
                          type="button"
                          className="py-3.5 px-7 text-base font-medium text-blue-100 focus:outline-none bg-[#202142] rounded-lg border border-blue-200 hover:bg-blue-900 focus:z-10 focus:ring-4 focus:ring-blue-200 "
                        >
                          Change picture
                        </button>
                        <button
                          type="button"
                          className="py-3.5 px-7 text-base font-medium text-blue-900 focus:outline-none bg-white rounded-lg border border-blue-200 hover:bg-blue-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-blue-200 "
                        >
                          Delete picture
                        </button>
                      </div>
                    </div>
                    <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-blue-900"
                          >
                            Your name
                          </label>
                          <input
                            type="text"
                            id="nome"
                            name="nome"
                            className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Enter your name"
                            value={newUser.nome}
                            onChange={updateState}
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-2 sm:mb-6">
                        <label
                          htmlFor="email"
                          className="block mb-2 text-sm font-medium text-blue-900"
                        >
                          Your email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          placeholder="your.email@mail.com"
                          defaultValue={newUser.usuario}
                          onChange={updateState}
                          required
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <form className="p-2 md:p-4">
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                  <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                    Account Settings
                  </h2>
                  <div className="grid max-w-2xl mx-auto mt-8">
                    <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full">
                          <label
                            htmlFor="newPassword"
                            className="block mb-2 text-sm font-medium text-blue-900"
                          >
                            Change password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Enter your new password"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                        <div className="w-full">
                          <label
                            htmlFor="newPasswordConfirmation"
                            className="block mb-2 text-sm font-medium text-blue-900"
                          >
                            Confirm your new password
                          </label>
                          <input
                            type="password"
                            id="newPasswordConfirmation"
                            className="bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Confirm new password"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-center gap-8 my-16">
                        <h2 className="font-bold text-xl">Danger Zone</h2>
                        <button
                          type="button"
                          className="text-white bg-red-700  hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                          onClick={() => {
                            setIsDeleting(true);
                          }}
                        >
                          Delete Account
                        </button>
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </main>
          {isDeleting && (
            <ModalDelete
              message="Are you sure you want to do this? This action cannot be undone."
              openModal={isDeleting}
              setOpenModal={() => setIsDeleting(false)}
              handleDelete={deleteUser}
            />
          )}
        </>
      )}
    </div>
  );
}
