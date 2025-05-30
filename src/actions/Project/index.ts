"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createProject = async (formData: FormData): Promise<any> => {
  console.log(formData);

  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token || "",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to create project");
    }

    revalidateTag("project");
    return await res.json();
  } catch (error: any) {
    console.error("Create project error:", error.message);
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

export const updateProject = async (
  editingProjectId: string,
  skillData: FormData
) => {
  console.log(editingProjectId);

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

export const deleteProject = async (projectId: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/projects/${projectId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token || "",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to delete project");
    }
    revalidateTag("project");

    return await res.json();
  } catch (error: any) {
    console.error("Delete skill error:", error.message);
    return { error: error.message };
  }
};
