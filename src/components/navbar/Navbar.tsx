export default function Navbar() {
  return (
    <nav className="w-full p-4 text-white bg-gray-800 flex items-center justify-between border-b-2 drop-shadow">
      <h1 className="flex gap-2 items-center font-extrabold cursor-pointer">
        <i className="fa-solid fa-flask text-3xl"></i>Relli's Blog
      </h1>
      <ul className="flex items-center gap-8">
        <li>Posts</li>
        <li>Themes</li>
        <li>New theme</li>
        <li>Profile</li>
        <li>Sign out</li>
      </ul>
    </nav>
  );
}
