"use client";
import { Download } from "lucide-react";
import ButtonLink from "../../ui/ButtonLink";
import { TypeAnimation } from "react-type-animation";

const HeroLeftSide = () => {
  return (
    <div className="text-white z-10">
      <div className="-mt-10 mb-10 md:mt-20 text-center md:text-start">
        <p className="text-2xl md:text-4xl font-bold text-gray-200 md:mb-2">
          Hi! I am Mehedi{" "}
        </p>
        <div className="text-2xl md:text-4xl font-bold text-gray-200">
          <TypeAnimation
            className=""
            sequence={[
              "Frontend Developer",
              1000,
              "Mern Stack Developer",
              1000,
              "React Developer",
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>
        <p className="text-xl md:text-3xl font-bold text-gray-400 md:mt-4 mb-4">
          with a one years plus experience
        </p>
        <div className="">
          <ButtonLink
            className="text-sm font-sans"
            href="/resume.pdf"
            download="mehedi.pdf"
            // target="_blank"
            title="Download Resume"
            icon={Download}
          >
            My Resume
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

export default HeroLeftSide;
