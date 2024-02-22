import { useState } from "react";
import LoadingCategoryCard from "./LoadingCategoryCard";

export default function LoadingCategoryCardContainer() {
  const [screen] = useState(window.innerWidth);

  return (
    <>
      {screen > 768 ? (
        <>
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
          <LoadingCategoryCard />
        </>
      ) : (
        <LoadingCategoryCard />
      )}
    </>
  );
}
