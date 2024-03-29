import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UserLogin from "../../model/UserLogin";

// const loginAction =
//   (handleLogin, userLogin) =>
//   async ({ request }) => {
//     const formData = await request.formData();
//     const user = Object.fromEntries(formData);

//     return handleLogin(userLogin);
//   };

export default function LoginForm() {
  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState<UserLogin>({} as UserLogin);

  const { user, handleLogin } = useContext(AuthContext);

  useEffect(() => {
    if (user.token !== "") {
      navigate("/");
    }
  }, [user, navigate]);

  function updateState(e: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(userLogin);
  }

  return (
    <div className="flex flex-col min-w-96 py-6 px-6 z-30 col-start-1 col-end-1 row-start-2 row-end-4 md:pl-[40%] md:pr-8 md:col-start-2 md:col-end-4 md:row-start-1">
      <form onSubmit={login} className="flex flex-col gap-4 pt-14 md:pt-32">
        <div>
          <div>
            <label
              htmlFor="usuario"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="usuario"
              name="usuario"
              autoComplete="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="email@example.com"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            />
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="senha"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              autoComplete="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="**********"
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateState(e)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
