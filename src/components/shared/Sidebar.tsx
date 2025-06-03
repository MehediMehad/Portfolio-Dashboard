"use client";
import Link from "next/link";
import {
  Home,
  User,
  Briefcase,
  BookOpen,
  Mail,
  // Settings,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { logout } from "@/actions/AuthService";
import { protectedRoutes } from "@/constants";
import LogoutConfirmationModal from "./LogoutConfirmationModal";
import { useState } from "react";

const Sidebar = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Modal state
  const path = usePathname();
  const { setIsLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    setIsLoading(true);
    // router.push("/");

    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/login");
    }
  };

  return (
    <>
      <aside className="w-64 bg-[#120b20] border-r border-[#2d1b4d] hidden max-h-screen sticky top-0 md:block">
        <div className="p-6">
          {/* <Link href="/" className="flex items-center gap-2 text-[#a855f7]">
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-bold text-lg">Portfolio Admin</span>
          </Link> */}
          <Link href="/" className="flex items-center gap-2 text-[#a855f7]">
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
        </div>

        <nav className="mt-6">
          <div className="px-4 py-2">
            <p className="text-gray-400 text-xs uppercase font-medium">
              General
            </p>
          </div>

          <Link
            href="/"
            className={`flex items-center gap-3 px-6 py-3 hover:bg-[#1a1025] transition-colors ${
              path === "/" && " border-l-2 border-[#a855f7] text-[#a855f7]"
            }`}
          >
            <User size={18} />
            <span className="text-gray-400 hover:text-white">Profile</span>
          </Link>

          <Link
            href="/projects"
            className={`flex items-center gap-3 px-6 py-3 hover:bg-[#1a1025] transition-colors ${
              path === "/projects" &&
              " border-l-2 border-[#a855f7] text-[#a855f7]"
            }`}
          >
            <Briefcase size={18} />
            <span className="text-gray-400 hover:text-white">Projects</span>
          </Link>

          <Link
            href="/blogs"
            className={`flex items-center gap-3 px-6 py-3 hover:bg-[#1a1025] transition-colors ${
              path === "/blogs" && " border-l-2 border-[#a855f7] text-[#a855f7]"
            }`}
          >
            <BookOpen size={18} />
            <span className="text-gray-400 hover:text-white">Blogs</span>
          </Link>

          <Link
            href="/messages"
            className={`flex items-center gap-3 px-6 py-3 hover:bg-[#1a1025] transition-colors ${
              path === "/messages" &&
              " border-l-2 border-[#a855f7] text-[#a855f7]"
            }`}
          >
            <Mail size={18} />
            <span className="text-gray-400 hover:text-white">Messages</span>
          </Link>

          <div className="px-4 py-2 mt-6">
            <p className="text-gray-400 text-xs uppercase font-medium">Other</p>
          </div>

          {/* <Link
            href="/settings"
            className={`flex items-center gap-3 px-6 py-3 hover:bg-[#1a1025] transition-colors ${
              path === "/settings" &&
              " border-l-2 border-[#a855f7] text-[#a855f7]"
            }`}
          >
            <Settings size={18} />
            <span className="text-gray-400 hover:text-white">Settings</span>
          </Link> */}

          <Link
            href="/https://mehedimehad.vercel.app/"
            target="_blank"
            className="flex items-center gap-3 px-6 py-3 hover:bg-[#1a1025] transition-colors"
          >
            <Home size={18} />
            <span className="text-gray-400 hover:text-white">View Site</span>
          </Link>

          <button
            onClick={() => setIsLogoutModalOpen(true)} // Open modal on click
            className="flex w-full items-center gap-3 px-6 py-3 hover:bg-[#1a1025] transition-colors"
          >
            <LogOut size={18} />
            <span className="text-gray-400 hover:text-white">Logout</span>
          </button>
        </nav>
      </aside>
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;
