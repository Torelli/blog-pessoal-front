import { Link } from "react-router-dom";
import Post from "../../model/Post";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="w-full px-4 flex flex-col items-center justify-center gap-4 md:justify-start">
      <Link
        to={`/posts/${post.id}`}
        className="flex items-center justify-center gap-8 px-4 py-8 border rounded-lg hover:bg-gray-200 transition-all"
      >
        <img
          className="size-16 group-hover:scale-105 transition-all rounded-full"
          src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${post.usuario.nome}`}
          alt="avatar"
        />
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-2xl">{post.titulo}</h3>
            <p className="text-xs"></p>
          </div>
          <p className="line-clamp-3 leading-tight md:line-clamp-2">
            {post.texto}
          </p>
        </div>
      </Link>
      <p className="flex justify-between w-full text-xs px-2 text-end md:block">
        <div>
          <span className="italic">By</span>{" "}
          <Link
            className="font-semibold hover:underline"
            to={`/users/${post.usuario.id}`}
          >
            {post.usuario.nome}
          </Link>
        </div>
        <div className="italic">{post.data}</div>
      </p>
    </div>
  );
}
