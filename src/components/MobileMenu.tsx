import Link from "next/link";

const MobileMenu = () => {
  return (
    <div className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 text-center text-white">
        <Link
          href="/"
          className="block px-3 py-2 rounded-md hover:bg-purple-500 duration-500"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="block px-3 py-2 rounded-md hover:bg-purple-500 duration-500"
        >
          About
        </Link>
        <Link
          href="/projects"
          className="block px-3 py-2 rounded-md hover:bg-purple-500 duration-500"
        >
          Projects
        </Link>
        <Link
          href="/contact"
          className="block px-3 py-2 rounded-md hover:bg-purple-500 duration-500"
        >
          Contact
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
