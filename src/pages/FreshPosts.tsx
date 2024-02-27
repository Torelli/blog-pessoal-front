import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import LoadingPostCard from "../components/cards/LoadingPostCard";
import { find } from "../service/Service";
import Post from "../model/Post";
import PostCard from "../components/cards/PostCard";

export default function FreshPosts() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([] as Post[])

  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  useEffect(() => {
    if (token === "") navigate("/login");
  }, [token, navigate]);

  useEffect(() => {
    async function getPosts() {
      try {
        setIsLoading(true);
        await find("/postagens", setPosts, {
          headers: { Authorization: token },
        });
        setIsLoading(false);
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        }
        setIsLoading(false);
      }
    }
    getPosts()
  }, [posts.length]);

  return (
    <div className="w-full py-24 md:px-8 md:min-h-[90vh]">
      <h2
        className="text-4xl font-bold ml-4 md:px-0"
      >
        Check out some fresh posts!
      </h2>
      <div className="mt-12 flex flex-col gap-4 items-center justify-center w-full">
        {isLoading ? (
          <>
            <LoadingPostCard />
            <LoadingPostCard />
          </>
        ) : posts != null && posts.length > 0 ? (
          posts.map((post) => {
            return <PostCard key={post.id} category={post.tema} post={post} />;
          })
        ) : (
          <h3 className="flex flex-col gap-12 text-center text-3xl mt-16 text-gray-800">
            <i className="fa-regular fa-face-frown fa-2xl"></i>No posts yet...
          </h3>
        )}
      </div>
    </div>
  );
}
