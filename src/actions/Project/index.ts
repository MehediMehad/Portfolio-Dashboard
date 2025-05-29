"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createProject = async (projectsData: FormData): Promise<any> => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      method: "POST",
      body: projectsData,
      headers: {
        Authorization: token || "",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to projects");
    }

    revalidateTag("project");

    return await res.json();
  } catch (error: any) {
    console.error("projects error:", error.message);
    return { error: error.message };
  }
};

export const getAllProjects = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/get-my-project`,
      {
        headers: {
          Authorization: token || "",
        },
        next: {
          tags: ["project"],
        },
      }
    );

    if (!res.ok) {
      throw new Error("You are not authorized!");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("getAllSkills error:", error.message);
    return { error: error.message };
  }
};

export const updateProject = async (skillData: FormData) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
      method: "PATCH",
      body: skillData,
      headers: {
        Authorization: token || "",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to update skill");
    }

    revalidateTag("user-profile");

    return await res.json();
  } catch (error: any) {
    console.error("Update skill error:", error.message);
    return { error: error.message };
  }
};

// Skill deleted
export const deleteProject = async (skillId: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project/${skillId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token || "",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to delete skill");
    }

    revalidateTag("user-profile");

    return await res.json();
  } catch (error: any) {
    console.error("Delete skill error:", error.message);
    return { error: error.message };
  }
};
