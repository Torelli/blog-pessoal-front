import { useParams } from "react-router-dom";
import User from "../model/User";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { find } from "../service/Service";
import LoadingPostCard from "../components/cards/LoadingPostCard";
import PaginatedItems from "../components/pagination/PaginatedItems";
import Post from "../model/Post";

export default function Profile() {
  const { user, handleLogout } = useContext(AuthContext);
  const token = user.token;

  const { id } = useParams<{ id: string }>();

  const [userProfile, setUserProfile] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUser() {
      try {
        setIsLoading(true);
        await find(`/usuarios/${id}`, setUserProfile, {
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
    getUser();
  }, [handleLogout, token, id]);

  return (
    <div className="w-full py-24 md:px-8 md:min-h-[90vh]">
      <div className="flex items-center">
        {isLoading ? (
          <div className="mx-4 size-14 rounded-full bg-gray-200 animate-pulse"></div>
        ) : (
          user.token !== "" && (
            <img
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              src={
                userProfile.foto != ""
                  ? userProfile.foto
                  : `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${
                      userProfile.usuario != undefined &&
                      userProfile.usuario.split("@").shift()
                    }`
              }
              alt="avatar"
            />
          )
        )}

        <h2
          className={`${
            isLoading && "w-1/4 h-12 bg-gray-200 animate-pulse"
          } text-4xl font-bold ml-4 md:px-0`}
        >
          {!isLoading && `${userProfile.nome}'s posts`}
        </h2>
      </div>
      <div className="mt-12 flex flex-col gap-4 items-center justify-center w-full">
        {isLoading ? (
          <>
            <LoadingPostCard />
            <LoadingPostCard />
          </>
        ) : userProfile.postagens != null &&
          userProfile.postagens.length > 0 ? (
          <PaginatedItems
            items={userProfile.postagens as Post[]}
            itemsPerPage={3}
          />
        ) : (
          <h3 className="flex flex-col gap-12 text-center text-3xl mt-16 text-gray-800">
            <i className="fa-regular fa-face-frown fa-2xl"></i>This user doesn't
            have any posts yet...
          </h3>
        )}
      </div>
    </div>
  );
}
