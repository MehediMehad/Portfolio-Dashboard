"use server";
import { BASEURL } from "@/lib/URL";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createSkill = async (skillData: FormData): Promise<any> => {
  console.log("skillData =>", skillData);

  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${BASEURL}/skill`, {
      method: "POST",
      body: skillData,
      headers: {
        Authorization: token || "",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to update profile");
    }

    revalidateTag("user-profile");

    return await res.json();
  } catch (error: any) {
    console.error("Update profile error:", error.message);
    return { error: error.message };
  }
};

export const getAllSkills = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${BASEURL}/skill/get-my-skills`,
      {
        headers: {
          Authorization: token || "",
        },
        next: {
          tags: ["user-profile"],
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

export const updateSkill = async (skillData: FormData) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${BASEURL}/skill`, {
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
export const deleteSkill = async (skillId: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${BASEURL}/skill/${skillId}`,
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
