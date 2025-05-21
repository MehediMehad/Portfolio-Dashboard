import { Facebook, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProfileSection = () => {
  return (
    <section className="bg-[#120b20] rounded-lg p-6 flex flex-col items-center border border-borderPrimary">
      <div className="relative">
        <div className="w-52 h-52 rounded-full overflow-hidden relative">
          <Image
            src="https://scontent.fdac24-2.fna.fbcdn.net/v/t1.6435-9/96159572_635804407002999_7582710571485626368_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHJ57aG0Y7HuinPXUIKwhDktOYW567s_3605hbnruz_fve4pB1afWuhLcjOGFKa65J32cLIDFO7rAoGqSNa9uit&_nc_ohc=fevIN_EVxtkQ7kNvwExBoqC&_nc_oc=AdkQt6xnFHUZc20j81jpVBNXq_L28IGwYwStIRcjF5z5uSV6NhfiWRUhXmQAWQXmXrc&_nc_zt=23&_nc_ht=scontent.fdac24-2.fna&_nc_gid=SpQ7nRASbFkwpTGJJHFL9A&oh=00_AfJz8D2jDldwSVW3n8eGLDjxfaIRRE9jRAMozFIF_uZzsw&oe=685064E0"
            alt="Profile"
            width={208}
            height={208}
            className="object-cover"
          />
        </div>
        {/* TODO: */}
        {/* <div className="absolute bottom-0 right-0 bg-[#a855f7] rounded-full p-2">
          <Play className="w-6 h-6 text-white" />
        </div> */}
      </div>
      <h2 className="text-white text-3xl font-bold mt-4">Mehedi Mehad</h2>
      <p className="text-gray-400 mt-1">mehedimehad@gmail.com</p>
      <p className="text-textPrimary mt-4">I am React Developer|</p>
      <div className="flex space-x-4 mt-6">
        <Link href="#" className="text-white hover:text-textPrimary">
          <Facebook className="w-6 h-6" />
        </Link>
        <Link href="#" className="text-white hover:text-textPrimary">
          <Linkedin className="w-6 h-6" />
        </Link>
        <Link href="#" className="text-white hover:text-textPrimary">
          <Github className="w-6 h-6" />
        </Link>
      </div>
    </section>
  );
};

export default ProfileSection;
