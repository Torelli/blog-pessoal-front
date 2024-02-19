export default function Footer() {
  return (
    <div className="h-16 p-8 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <i className="fa-solid fa-flask"></i>
        <h2>Relli's Blog</h2>
      </div>
      <ul className="flex items-center justify-center gap-2">
        <li>Home</li>
        <li>About</li>
        <li>Blog</li>
      </ul>
      <div>
        © 2024 All rights reserved.
        <a href="https://github.com/Torelli/blog-pessoal-front">
          Relli's Blog
        </a>
      </div>
    </div>
  );
}
