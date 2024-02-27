import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.token !== "") navigate("/posts");
  });

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-2">
      <h2 className="text-5xl text-center font-extrabold max-w-lg border-gray-300 leading-snug p-4 md:text-7xl">
        Welcome to{" "}
        <span
          className="bg-gradient-to-br from-blue-500 to-fuchsia-600 bg-clip-text border-b border-b-gray-400 border-dashed px-4 hover:bg-clip-border cursor-pointer transition-all"
          id="postlab"
        >
          Postlab
        </span>
      </h2>
      <span>Express your thoughts and opinions!</span>
      <Link
        to="/posts"
        className="bg-transparent mt-6 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        View posts
      </Link>
    </div>
  );
}
