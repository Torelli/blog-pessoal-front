import { Form, redirect } from "react-router-dom";
import User from "../model/User";
import { createUser } from "../service/UserService";

export async function createNewUser({ request }) {
  const formData = await request.formData();
  const user = Object.fromEntries(formData);
  if (user.passwordConfirm === user.senha && user.senha.length >= 8) {
    delete user.passwordConfirm;
    try {
      const response = await createUser("usuarios/cadastrar", user as User);
      console.log(response);
      alert(`User ${response.nome} created successfully!`);
      return redirect("/login");
    } catch (error) {
      alert("Error signing up");
      console.log(error);
    }
  }
}

export default function SignUp() {
  return (
    <div className="w-1/2 grid grid-cols-3 grid-rows-1">
      <div className="grid grid-rows-1 col-start-1 col-end-3 drop-shadow-2xl row-start-1">
        <div className="item1 flex flex-col items-center justify-start pl-8 pt-4 pr-44 gap-4 z-50 text-2xl font-bold text-white">
          <button className="flex items-center gap-4 py-2 w-9 overflow-hidden hover:w-24 hover:drop-shadow-lg place-self-start mb-40 bg-white rounded-full shadow-md text-gray-700 px-3 transition-all">
            <i className="fa-solid fa-chevron-left fa-xs"></i>
            <span className="text-sm font-thin">Login</span>
          </button>
          <i className="fa-solid fa-flask text-8xl pb-1"></i>
          <h2>Join Postlab now!</h2>
        </div>
        <svg
          className="item2 z-10 drop-shadow-2xl rounded-3xl"
          id="visual"
          viewBox="0 0 680 540"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
        >
          <defs>
            <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
              <stop stopColor="rgba(192, 38, 211, 1)" offset="0%"></stop>
              <stop stopColor="rgba(59, 130, 246, 1)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 381 0 L 428 0 C 518 -4 527 77 525 90 C 522 151 478.5 180 442.42 216 C 406.23 252 393.47 288 409.2 324 C 424.93 360 529 413 517 548 L 0 540 L 0 522 C 0 504 0 468 0 432 C 0 396 0 360 0 324 C 0 288 0 252 0 216 C 0 180 0 144 0 108 C 0 72 0 36 0 18 L 0 0 Z"
            fill="url(#sw-gradient-0)"
            strokeLinecap="round"
            strokeLinejoin="miter"
          ></path>
        </svg>
      </div>
      <div className="border py-6 pl-[40%] pr-8 col-start-2 col-end-4 row-start-1 shadow-2xl">
        <Form method="post" className="flex flex-col gap-4">
          <div>
            <div>
              <label
                htmlFor="nome"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Full name
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="John Doe"
              />
            </div>
          </div>
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
              />
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="foto"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Picture url
              </label>
              <input
                type="text"
                id="foto"
                name="foto"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="url"
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
                autoComplete="new-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="secret..."
              />
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="passwordConfirm"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                autoComplete="new-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Confirm your secret..."
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
