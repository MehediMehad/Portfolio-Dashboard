import { ArrowRight } from "lucide-react";
import Link from "next/link";
import BlogCard from "../ui/card/BlogCard";
import { blogs } from "@/lib/mock/blogs";


const BlogSection = () => {
  return (
      <section className="container mx-auto mt-16 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#a855f7] text-3xl font-bold">Latest Blog Posts</h2>
          <Link href="/blog" className="flex items-center text-[#a855f7] hover:text-[#c084fc]">
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.slice(0, 3).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
  );
};

export default BlogSection;