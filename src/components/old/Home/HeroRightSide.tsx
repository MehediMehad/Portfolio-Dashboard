import Image from "next/image";
import myImage from "@/assets/mehed.png";

const HeroRightSide = () => {
  return (
    <div className="z-10 justify-end">
      <div className="rounded-md flex justify-center">
        <Image
          src={myImage}
          alt="My Image"
          width={400}
          height={300}
          className=" shadow-lg rounded-md border-[6px] border-[#5D0855]"
        />
      </div>
    </div>
  );
};

export default HeroRightSide;
