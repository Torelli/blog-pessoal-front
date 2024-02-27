import { useState } from "react";
import ReactPaginate from "react-paginate";
import Post from "../../model/Post";
import PostCard from "../cards/PostCard";
import Category from "../../model/Category";

function Items({
  currentItems,
  category,
}: {
  currentItems: Post[];
  category?: Category;
}) {
  if (category)
    return (
      <>
        {currentItems &&
          currentItems.map((post: Post) => (
            <PostCard key={post.id} category={category} post={post} />
          ))}
      </>
    );

  return (
    <>
      {currentItems &&
        currentItems.map((post: Post) => (
          <PostCard key={post.id} category={post.tema} post={post} />
        ))}
    </>
  );
}

export default function PaginatedItems({
  itemsPerPage,
  items,
  category,
}: {
  itemsPerPage: number;
  items: Post[];
  category?: Category;
}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items category={category} currentItems={currentItems} />
      <ReactPaginate
        className="flex items-baseline justify-center gap-2 *:px-2 *:border *:rounded hover:*:bg-gray-100"
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
