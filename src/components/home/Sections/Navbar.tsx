import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-[#0f0a1a] container mx-auto px-4 py-4 border border-borderPrimary rounded-lg">
      <div className="md:px-10 flex items-center justify-between ">
        <Link href="/" className="text-textPrimary">
          <svg
            width="48"
            height="48"
            viewBox="0 0 120 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 80V20H20L40 60L60 20H70L90 60L110 20H120V80H110V40L90 80H80L60 40L40 80H30L10 40V80H10Z"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <div className="flex items-center space-x-8">
          <Link href="/" className="text-textPrimary hover:text-[#c084fc]">
            Home
          </Link>
          <Link
            href="/projects"
            className="text-textPrimary hover:text-[#c084fc]"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="text-textPrimary hover:text-[#c084fc]"
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            className="text-textPrimary hover:text-[#c084fc]"
          >
            Contact
          </Link>
          <Link
            href="/resume"
            className="border  hover:bg-primary/5 border-[#a855f7] text-textPrimary font-bold px-5 py-2 bg-transparent rounded-full"
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
