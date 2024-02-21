import { useContext, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import { Link, Outlet, useLocation, useNavigation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Credentials() {
  const location = useLocation();
  const navigation = useNavigation();
  const [screen, setScreen] = useState(window.innerWidth);

  const { isLoading } = useContext(AuthContext);

  return (
    <div
      onTouchStart={() => setScreen(window.innerWidth)}
      onMouseMove={() => setScreen(window.innerWidth)}
      className="w-full min-h-screen flex md:items-center md:justify-center"
    >
      <div
        className={`relative grid grid-rows-3 grid-cols-[1fr] md:shadow-2xl md:rounded-s-3xl md:min-h-[35rem] md:w-1/2 md:grid-cols-3 md:grid-rows-1`}
      >
        <div className="grid h-5/6 overflow-x-hidden grid-rows-1 drop-shadow-2xl rounded-s-3xl col-start-1 row-start-1 row-end-3 z-20 md:row-end-1 md:h-auto md:col-start-1 md:col-end-3">
          <div
            className={`col-start-1 px-2 col-end-2 row-start-1 row-end-1 flex flex-col items-center justify-start md:pl-8 pt-4 md:pr-44 $ z-50 text-2xl font-bold text-white`}
          >
            {location.pathname == "/sign-up" && (
              <Link
                to="/login"
                className="flex mt-16 items-center gap-4 py-2 w-9 overflow-hidden hover:w-24 hover:drop-shadow-lg place-self-start bg-white rounded-full shadow-md text-gray-700 px-3 md:mt-4 md:mb-40 transition-all"
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
              <div className={`${location.pathname == "/login" && "mt-12 md:mt-52"}`}>
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
                className={`fa-solid fa-flask text-5xl md:text-8xl pb-1 ${
                  location.pathname == "/login" && "mt-20 md:mt-52"
                }`}
              ></i>
            )}

            {location.pathname == "/sign-up" ? (
              <h2
                className={`${navigation.state !== "idle" && "animate-pulse"}`}
              >
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
            className="col-start-1 col-end-1 row-start-1 row-end-1 z-10 drop-shadow-2xl rounded-3xl md:col-start-1 md:col-end-2 md:row-end-1"
            id="visual"
            viewBox={screen > 768 ? "0 0 680 540" : "-500 80 448.1 600"}
            height="100%"
            width={screen > 768 ? "111%" : "100%"}
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
              d={
                screen > 768
                  ? "M 381 0 L 428 0 C 518 -4 527 77 525 90 C 522 151 478.5 180 442.42 216 C 406.23 252 393.47 288 409.2 324 C 424.93 360 529 413 517 548 L 0 540 L 0 522 C 0 504 0 468 0 432 C 0 396 0 360 0 324 C 0 288 0 252 0 216 C 0 180 0 144 0 108 C 0 72 0 36 0 18 L 0 0 Z"
                  : "M 0 381 L 0 428 C 4 518 -77 527 -90 525 C -151 522 -180 478.5 -216 442.42 C -252 406.23 -288 393.47 -324 409.2 C -360 424.93 -413 529 -548 517 L -540 0 L -522 0 C -504 0 -468 0 -432 0 C -396 0 -360 0 -324 0 C -288 0 -252 0 -216 0 C -180 0 -144 0 -108 0 C -72 0 -36 0 -18 0 L 0 0 Z"
              }
              fill="url(#sw-gradient-0)"
              strokeLinecap="round"
              strokeLinejoin="miter"
            ></path>
          </svg>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
