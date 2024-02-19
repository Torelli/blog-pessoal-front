import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full text-gray-800 bg-white border-b border-b-gray-200 flex items-center justify-between drop-shadow">
      <h1 id="postlab" className="flex gap-2 p-4 items-end font-extrabold cursor-pointer bg-gradient-to-br from-blue-500 to-fuchsia-600 bg-clip-text">
        <i className="fa-solid fa-flask text-3xl pb-1"></i>
        <span className="text-2xl">Postlab</span>
      </h1>
      <ul className="flex items-center gap-8 pr-4 font-bold">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive, isPending }) =>
              isActive
                ? "border-b-2 border-gray-200"
                : isPending
                ? "animate-pulse"
                : "hover:border-b-2 hover:border-gray-200"
            }
          >
            Home
          </NavLink>
        </li>
        <li>Categories</li>
        <li>New category</li>
        <li>Profile</li>
        <li>
          <NavLink
            to={"/login"}
            className={({ isActive, isPending }) =>
              isActive
                ? "border-b-2 border-gray-200"
                : isPending
                ? "animate-pulse"
                : "hover:border-b-2 hover:border-gray-200"
            }
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
