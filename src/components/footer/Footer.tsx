export default function Footer() {
  return (
    <div className="w-full mt-auto bg-gray-800 text-white p-6 flex flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-center gap-2">
        <i className="fa-solid fa-flask"></i>
        <h2>Relli's Blog</h2>
      </div>
      <div className="flex items-center gap-4 text-4xl">
        <i className="fa-brands fa-linkedin cursor-pointer hover:text-indigo-500"></i>
        <i className="fa-brands fa-github cursor-pointer hover:text-indigo-500"></i>
      </div>
      <div className="flex items-center gap-2">
        © 2024 All rights reserved.
        <a
          className="cursor-pointer text-indigo-500"
          href="https://github.com/Torelli/blog-pessoal-front"
          target="_blank"
        >
          Relli's Blog
        </a>
      </div>
    </div>
  );
}
