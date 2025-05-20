import lightModeImg from "@/assets/top_bg_light.svg";
import darkModeImg from "@/assets/top_bg_dark.svg";
import js from "@/assets/js.png";

import Image from "next/image";
import React from "react";
import HeroLeftSide from "./HeroLeftSide";
import HeroRightSide from "./HeroRightSide";

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center py-20 max-h-[80%]"
      style={{ backgroundImage: `url(${darkModeImg.src})` }}
    >
      {/* bg-gradient-to-b from-[#121126] to-[#1b0b37] */}
      <div
        className="absolute bg-green-700"
        // style={{
        //   background:
        //     "linear-gradient(50deg, rgba(15, 14, 14, 0.9) 0%, rgba(7, 20, 13, 0.91) 100%)",
        // }}
      ></div>
      <div className="max-w-[1480px] mx-auto px-4 lg:px-10  h-full flex items-center">
        <div className="flex flex-col md:flex-row justify-between w-full">
          <HeroLeftSide />
          <HeroRightSide />
        </div>
      </div>
      {/* Skills Logos */}
      <div className="absolute bottom-0 left-0 w-1/2 py-4">
        <div className="container mx-auto flex justify-center space-x-4">
          {/* Example Logo */}
          <div className="w-12 h-12 relative right-10 z-20 mx-2">
            <Image
              src={js}
              alt="JavaScript"
              width={48}
              height={48}
              className="animate-bounce"
            />
          </div>
          {/* Add more logos similarly */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
