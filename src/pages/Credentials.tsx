import { useContext } from "react";
import { MutatingDots } from "react-loader-spinner";
import { Link, Outlet, useLocation, useNavigation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Credentials() {
  const location = useLocation();
  const navigation = useNavigation();

  const { isLoading } = useContext(AuthContext);

  return (
    <div
      className={`w-1/2 relative min-h-[35rem] grid grid-cols-3 grid-rows-1 shadow-2xl rounded-s-3xl`}
    >
      <div className="grid grid-rows-1 col-start-1 col-end-3 drop-shadow-2xl row-start-1 z-20">
        <div
          className={`item1 flex flex-col items-center justify-start pl-8 pt-4 pr-44 ${
            location.pathname == "sign-up" ? "gap-4" : "gap-2"
          } z-50 text-2xl font-bold text-white`}
        >
          {location.pathname == "/sign-up" && (
            <Link
              to="/login"
              className="flex items-center gap-4 py-2 w-9 overflow-hidden hover:w-24 hover:drop-shadow-lg place-self-start mb-40 bg-white rounded-full shadow-md text-gray-700 px-3 transition-all"
            >
              <i className="fa-solid fa-chevron-left fa-xs"></i>
              <span className="text-sm font-thin">
                {location.pathname == "/sign-up" ? "Login" : "Sign up"}
              </span>
            </Link>
          )}
          {isLoading ||
          navigation.state === "loading" ||
          navigation.state === "submitting" ? (
            <div className={`${location.pathname == "/login" && "mt-52"}`}>
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="white"
                secondaryColor="white"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <i
              className={`fa-solid fa-flask text-8xl pb-1 ${
                location.pathname == "/login" && "mt-52"
              }`}
            ></i>
          )}

          {location.pathname == "/sign-up" ? (
            <h2 className={`${navigation.state !== "idle" && "animate-pulse"}`}>
              {navigation.state !== "idle"
                ? "Registering..."
                : "Join Postlab now!"}
            </h2>
          ) : (
            <>
              <h2 className={`${isLoading && "animate-pulse"}`}>
                {isLoading ? "Loging in..." : "Login to Postlab"}
              </h2>
              <span className="text-sm font-thin">
                Don't have an account?{" "}
                <Link className="underline" to="/sign-up">
                  Sign up
                </Link>{" "}
                now!
              </span>
            </>
          )}
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
      <Outlet />
    </div>
  );
}
