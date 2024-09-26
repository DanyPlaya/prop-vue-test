import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-green-400 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center h-20 px-4">
        <h1 className="text-2xl font-bold">
          <Link href="/">TableView</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-slate-300 transition">
                Главная
              </Link>
            </li>

            <li>
              <Link
                href={"https://github.com/DanyPlaya/prop-vue-test"}
                target="_blank"
              >
                Ссылка на репозиторий
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
