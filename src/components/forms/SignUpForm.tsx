import { Form, redirect, useNavigation } from "react-router-dom";
import { createUser } from "../../service/UserService";
import { MutatingDots } from "react-loader-spinner";
import User from "../../model/User";

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
  return null;
}

export default function SignUpForm() {
  return (
    <div className="py-6 pl-[40%] pr-8 col-start-2 col-end-4 row-start-1 z-30">
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
  );
}