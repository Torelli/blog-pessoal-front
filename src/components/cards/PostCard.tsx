import { Link } from "react-router-dom";
import Post from "../../model/Post";
import markdownToTxt from "markdown-to-txt";
import Category from "../../model/Category";

export default function PostCard({ post, category }: { post: Post, category: Category }) {
  const dividedBody = post.texto.split("\n");
  dividedBody.shift();
  const formattedBody = markdownToTxt(dividedBody.join("\n"));

  return (
    <div className="max-w-4xl w-full px-10 my-4 py-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">
          {new Date(post.data as string).toDateString()}
        </span>
        <Link to={`/categories/${category.id}`}
          className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
        >
          {category.descricao}
        </Link>
      </div>
      <div className="mt-2">
        <Link to={`/posts/${post.id}`}
          className="text-2xl text-gray-700 font-bold hover:text-gray-600"
        >
          {post.titulo}
        </Link>
        <p className="mt-2 text-gray-600 line-clamp-3">{formattedBody}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Link to={`/posts/${post.id}`} className="text-blue-600 hover:underline">
          Read more
        </Link>
        <div>
          <Link to={`/users/${post.usuario.id}`} className="flex items-center">
            <img
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${post.usuario.usuario.split("@").shift()}`}
              alt="avatar"
            />
            <h1 className="text-gray-700 font-bold">{post.usuario.nome}</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
