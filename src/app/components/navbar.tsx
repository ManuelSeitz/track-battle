import { GitHubIcon } from "@/app/components/icons";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="relative z-50 flex h-14 w-full items-center justify-between bg-neutral-900 px-6 max-lg:px-4">
      <Link href="/" className="select-none text-xl font-medium">
        <span className="font-semibold text-primary-500">Track</span> Battle
      </Link>
      <ul>
        <li>
          <a
            href="https://github.com/ManuelSeitz/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="size-[26px] transition-transform hover:scale-105" />
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
