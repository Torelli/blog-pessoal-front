export default function Footer() {
  return (
    <div className="w-full mt-auto bg-gray-800 text-white p-6 flex flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-4 text-4xl">
        <a target="_blank" href="https://www.linkedin.com/in/giovanni-torelli/"><i className="fa-brands fa-linkedin icon cursor-pointer hover:bg-gradient-to-br hover:from-blue-500 hover:to-fuchsia-600 hover:bg-clip-text"></i></a>
        <a target="_blank" href="https://github.com/Torelli"><i className="fa-brands fa-github icon cursor-pointer hover:bg-gradient-to-br hover:from-blue-500 hover:to-fuchsia-600 hover:bg-clip-text"></i></a>
      </div>
      <div className="flex items-center gap-2">
        © 2024 All rights reserved.
      </div>
    </div>
  );
}
