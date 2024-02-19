import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="w-full text-white bg-gray-800 flex items-center justify-between border-b-2 drop-shadow">
      <h1 className="flex gap-2 p-4 items-center font-extrabold cursor-pointer">
        <i className="fa-solid fa-flask text-3xl"></i>Relli's Blog
      </h1>
      <ul className="flex items-center gap-8 pr-4">
        <li>
          <NavLink
            to={"/"}
            className={({isActive, isPending}) =>
            isActive
              ? "border-b-2 border-white"
              : isPending
              ? "animate-pulse"
              : "hover:border-b-2 hover:white"}
          >
            Home
          </NavLink>
        </li>
        <li>Themes</li>
        <li>New theme</li>
        <li>Profile</li>
        <NavLink
            to={"/login"}
            className={({isActive, isPending}) =>
            isActive
              ? "border-b-2 border-white"
              : isPending
              ? "animate-pulse"
              : "hover:border-b-2 hover:white"}
          >
            Login
          </NavLink>
      </ul>
    </nav>
  );
}
