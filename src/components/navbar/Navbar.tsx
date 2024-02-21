import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(handleClickOutside);

  function handleClickOutside() {
    setIsOpen(false);
  }

  return (
    <nav
      onClick={(event) => event.stopPropagation()}
      className="flex flex-col items-start w-full z-50 fixed text-gray-800 bg-white border-b border-b-gray-200 md:py-0 md:flex-row md:items-start md:justify-between drop-shadow"
    >
      <div className="w-full self-stretch px-8 py-4 flex justify-between md:pb-0 md:w-auto">
        <h1
          id="postlab"
          className="flex md:gap-2 md:p-4 items-end font-extrabold cursor-pointer bg-gradient-to-br from-blue-500 to-fuchsia-600 bg-clip-text"
        >
          <i className="fa-solid fa-flask text-3xl pb-1"></i>
          <span className="text-2xl">Postlab</span>
        </h1>
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className={`${
            isOpen && "hidden"
          } text-gray-800 md:hidden hover:bg-gray-100 rounded-lg px-2`}
        >
          <i className="fa-solid fa-bars fa-lg"></i>
        </button>
        <button
          className={`${
            !isOpen && "hidden"
          } text-gray-800 md:hidden hover:bg-gray-100 rounded-lg px-2`}
        >
          <i className="fa-solid fa-xmark fa-lg"></i>
        </button>
      </div>
      <div
        className={`flex flex-col ${
          isOpen ? "max-h-screen" : "max-h-0"
        }  gap-4 w-full overflow-hidden md:gap-0 md:max-h-screen md:w-auto md:flex-row md:justify-between transition-all`}
      >
        <ul
          ref={ref}
          className="flex flex-col md:flex-row items-start md:items-center font-bold"
        >
          <li className="w-full">
            <NavLink
              to={"/"}
              className={({ isActive, isPending }) =>
                isActive
                  ? "block w-full px-8 py-4 md:py-6 bg-gray-100"
                  : isPending
                  ? "block w-full px-8 py-4 md:py-6 animate-pulse"
                  : "block w-full px-8 py-4 md:py-6 hover:bg-gray-100"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={"/categories"}
              className={({ isActive, isPending }) =>
                isActive
                  ? "block w-full px-8 py-4 md:py-6 bg-gray-100"
                  : isPending
                  ? "block w-full px-8 py-4 md:py-6 animate-pulse"
                  : "block w-full px-8 py-4 md:py-6 hover:bg-gray-100"
              }
            >
              Explore
            </NavLink>
          </li>
          {user.token !== "" && (
            <>
              <li className="w-full">Profile</li>
            </>
          )}
          <li className="w-full">
            {user.token === "" ? (
              <NavLink
                to={"/login"}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "block w-full px-8 py-4 md:py-6 bg-gray-100"
                    : isPending
                    ? "block w-full px-8 py-4 md:py-6 animate-pulse"
                    : "block w-full px-8 py-4 md:py-6 hover:bg-gray-100"
                }
              >
                Login
              </NavLink>
            ) : (
              <NavLink
                to={"/"}
                className="hover:border-b-2 hover:border-gray-200"
                onClick={handleLogout}
              >
                Log out
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
