import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function Navbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const ref = useOutsideClick(handleClickOutside);

  function handleClickOutside() {
    setIsOpen(false);
    setUserDropdown(false);
  }

  return (
    <nav
      onClick={(event) => event.stopPropagation()}
      className="flex flex-col items-start w-full z-50 fixed text-gray-800 bg-white border-b border-b-gray-200 md:py-0 md:flex-row md:items-center md:justify-between drop-shadow"
    >
      <div className="w-full px-8 py-4 flex justify-between md:items-center md:self-stretch md:py-0 md:w-auto">
        <Link to="/">
          <h1
            id="postlab"
            className="flex md:gap-2 md:p-4 items-end font-extrabold cursor-pointer bg-gradient-to-br from-blue-500 to-fuchsia-600 bg-clip-text"
          >
            <i className="fa-solid fa-flask text-3xl pb-1"></i>
            <span className="text-2xl">Postlab</span>
          </h1>
        </Link>
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
        }  gap-4 w-full overflow-hidden md:gap-0 md:max-h-full md:h-[4.5rem] md:w-auto md:flex-row md:justify-between transition-all`}
      >
        <ul
          ref={ref}
          className="flex flex-col md:flex-row items-start md:items-center font-bold"
        >
          <li className="w-full">
            <NavLink
              to={"/"}
              onClick={() => {
                setUserDropdown(false);
              }}
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
          {user.token !== "" && (
            <>
              <li className="w-full">
                <NavLink
                  to={"/categories"}
                  onClick={() => {
                    setUserDropdown(false);
                  }}
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
              <li className="w-full">
                {" "}
                {userDropdown ? (
                  <button
                    id="dropdownDividerButton"
                    data-dropdown-toggle="dropdownDivider"
                    className="flex items-center md:justify-center w-full px-8 py-4 md:py-6 hover:bg-gray-100 text-nowrap"
                    type="button"
                    onClick={() => {
                      setUserDropdown(false);
                    }}
                  >
                    <img
                      className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                      src={
                        user.foto != ""
                          ? user.foto
                          : `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${
                              user.usuario != undefined &&
                              user.usuario.split("@").shift()
                            }`
                      }
                      alt="avatar"
                    />
                    {user.usuario.split("@").shift()}
                    <i className="fa-solid fa-chevron-up fa-xs ml-2"></i>
                  </button>
                ) : (
                  <button
                    id="dropdownDividerButton"
                    data-dropdown-toggle="dropdownDivider"
                    className="flex items-center md:justify-center w-full px-8 py-4 md:py-6 hover:bg-gray-100 text-nowrap"
                    type="button"
                    onClick={() => {
                      setUserDropdown(true);
                    }}
                  >
                    <img
                      className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                      src={
                        user.foto != ""
                          ? user.foto
                          : `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${
                              user.usuario != undefined &&
                              user.usuario.split("@").shift()
                            }`
                      }
                      alt="avatar"
                    />
                    {user.usuario.split("@").shift()}
                    <i className="fa-solid fa-chevron-down fa-xs ml-2"></i>
                  </button>
                )}
                {/* Dropdown menu */}
                <div
                  id="dropdownDivider"
                  className={`z-10 ${
                    userDropdown ? "" : "hidden"
                  } bg-white divide-y divide-gray-100 rounded-b-md shadow w-full md:w-60 md:absolute md:top-[4.6rem] md:right-10`}
                >
                  <ul
                    className="py-2 text-sm text-gray-700"
                    aria-labelledby="dropdownDividerButton"
                  >
                    <li>
                      <NavLink
                        to={`users/${user.id}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={"/settings"}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Settings
                      </NavLink>
                    </li>
                  </ul>
                  <div className="py-2">
                    <NavLink
                      to={"/logout"}
                      className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                      onClick={handleLogout}
                    >
                      Log out
                    </NavLink>
                  </div>
                </div>
              </li>
            </>
          )}
          <li className="w-full">
            {user.token === "" && (
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
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
