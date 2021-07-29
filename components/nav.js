import Link from "next/link";

export default function Layout({ showHomeLink = true, darkTheme = false }) {
  return (
    <header className="flex items-center justify-between w-full py-8">
      {showHomeLink && (
        <h1 className="text-2xl font-extralight tracking-wide">
          <Link href="/">
            <a
              className={`text-2xl font-extralight ${
                darkTheme
                  ? "text-white hover:border-white"
                  : "text-black hover:border-black"
              } tracking-wide border-b border-transparent hover:border-opacity-50`}
            >
              cass.works
            </a>
          </Link>
        </h1>
      )}
      <nav className="ml-auto">
        <ul className="flex space-x-24">
          <li>
            <Link href="/work">
              <a
                className={`text-2xl font-extralight ${
                  darkTheme
                    ? "text-white hover:border-white"
                    : "text-black hover:border-black"
                } tracking-wide border-b border-transparent hover:border-opacity-50`}
              >
                work
              </a>
            </Link>
          </li>
          <li>
            <Link href="/info">
              <a
                className={`text-2xl font-extralight ${
                  darkTheme
                    ? "text-white hover:border-white"
                    : "text-black hover:border-black"
                } tracking-wide border-b border-transparent hover:border-opacity-50`}
              >
                info
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
