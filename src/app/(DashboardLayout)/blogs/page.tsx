import { getAllBlogs } from "@/actions/blogs";
import Blogs from "@/components/Blog/Blog";

const BlogPage = async () => {
  const data = await getAllBlogs();

  return (
    <div>
      <Blogs blogs={data?.data} />
    </div>
  );
};

export default BlogPage;
