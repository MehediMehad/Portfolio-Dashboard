import { User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-[#120b20] border-b border-[#2d1b4d] py-4 px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white text-xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#1a1025] flex items-center justify-center text-[#a855f7]">
              <User size={20} />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-[#120b20]"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
