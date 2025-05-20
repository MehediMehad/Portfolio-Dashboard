import { LucideView } from "lucide-react";
import Image from "next/image";

const Cards = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="relative border-2 bg-gradient-to-b from-[#0a0d16] to-[#21073e] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        >
          {/* Blog Image */}
          <div className="relative w-full h-[200px]">
            <Image
              src={blog.image}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Blog Details */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{blog.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#722585] text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Read More Button */}
          <div className="absolute flex justify-end px-3 w-full top-5 z-50">
            <LucideView
              size={40}
              className="p-2 bg-[#26171794] rounded-full cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
