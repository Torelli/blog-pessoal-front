import { Link } from "react-router-dom";
import Post from "../../model/Post";
import User from "../../model/User";

export default function PostCard({ post, user }: { post: Post; user: User }) {
  return (
    <div className="w-full px-4 flex flex-col items-center justify-center gap-4 md:justify-start">
      <Link
        to={``}
        className="flex items-center justify-center gap-8 px-4 py-8 border rounded-lg hover:bg-gray-200 transition-all"
      >
        <img
          className="size-16 group-hover:scale-105 transition-all rounded-full"
          src={`https://api.dicebear.com/7.x/bottts-neutral/svg`}
          alt="avatar"
        />
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-2xl">Lorem</h3>
            <p className="text-xs"></p>
          </div>
          <p className="line-clamp-3 leading-tight md:line-clamp-2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem rerum
            sit quis eligendi eum earum ipsam tenetur ut reiciendis aperiam
            corporis nihil maxime debitis, architecto, voluptates harum in! Aut,
            maxime! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatum, corrupti minus tempore iusto corporis aliquid aspernatur
            dignissimos nam deleniti veritatis quos dolorum optio doloremque ea
            nostrum deserunt illo cupiditate rerum? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Tempora impedit quidem quos
            architecto! Consequatur pariatur officiis accusamus corrupti
            aspernatur nihil, quis explicabo rerum ut blanditiis modi ullam
            possimus! Est, eveniet. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Quia voluptatibus nostrum voluptas itaque at
            animi. Dolores ducimus odio nesciunt quasi consequuntur id
            temporibus in, dolor perspiciatis! Eligendi esse quisquam
            repudiandae!
          </p>
        </div>
      </Link>
      <p className="flex justify-between w-full text-xs px-2 text-end md:block">
        <div>
          <span className="italic">By</span>{" "}
          <Link className="font-semibold hover:underline" to={``}>
            User
          </Link>
        </div>
        <div className="italic">February 8, 2024</div>
      </p>
    </div>
  );
}
