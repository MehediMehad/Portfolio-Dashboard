"use server";
import { BASEURL } from "@/lib/URL";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createBlog = async (formData: FormData): Promise<any> => {
  console.log("formData", formData);

  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${BASEURL}/blogs`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token || "",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to create blog");
    }

    revalidateTag("blog");
    return await res.json();
  } catch (error: any) {
    console.error("Create blog error:", error.message);
    return { error: error.message };
  }
};

export const updateBlog = async (blogData: FormData, blogId: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${BASEURL}/blogs/update-blog/${blogId}`,
      {
        method: "PATCH",
        body: blogData,
        headers: {
          Authorization: token || "",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to update blog");
    }

    revalidateTag("blog");
    return await res.json();
  } catch (error: any) {
    console.error("Update blog error:", error.message);
    return { error: error.message };
  }
};

export const getAllBlogs = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { error: "No access token found" };
  }

  try {
    const res = await fetch(
      `${BASEURL}/blogs/get-my-blogs`,
      {
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["blog"],
        },
      }
    );
    if (!res.ok) {
      throw new Error("You are not authorized!");
    }
    return await res.json();
  } catch (error: any) {
    console.error("Blog fetch error:", error.message);
    return { error: error.message };
  }
};

export const deleteBlog = async (blogId: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${BASEURL}/blogs/${blogId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token || "",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to delete blog");
    }
    revalidateTag("blog");

    return await res.json();
  } catch (error: any) {
    console.error("Delete skill error:", error.message);
    return { error: error.message };
  }
};
