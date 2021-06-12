import Link from "next/link";

export default function Layout({ showHomeLink = true }) {
  return (
    <header className="flex items-center justify-between w-full py-8">
      {showHomeLink && (
        <h1 className="text-2xl font-thin tracking-wide">
          <Link href="/">
            <a className="text-2xl font-thin tracking-wide hover:underline">
              cass.works
            </a>
          </Link>
        </h1>
      )}
      <nav className="ml-auto">
        <ul className="flex space-x-24">
          <li>
            <Link href="/work">
              <a className="text-2xl font-thin tracking-wide hover:underline">
                work
              </a>
            </Link>
          </li>
          <li>
            <Link href="/info">
              <a className="text-2xl font-thin tracking-wide hover:underline">
                info
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
