"use server";
import { BASEURL } from "@/lib/URL";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createSocialMedia = async (
  socialMediaData: FormData
): Promise<any> => {
  console.log("skillData =>", socialMediaData);
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${BASEURL}/social-media`,
      {
        method: "POST",
        body: socialMediaData,
        headers: {
          Authorization: token || "",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update profile");
    }
    // revalidateTag("user-profile");
    revalidateTag("social-media");

    return await res.json();
  } catch (error: any) {
    console.error("Update SocialMedia error:", error.message);
    return { error: error.message };
  }
};

export const getAllSocialMedias = async () => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${BASEURL}/social-media/get-all-my-social-medias`,
      {
        headers: {
          Authorization: token || "",
        },
        next: {
          tags: ["user-profile", "social-media"],
        },
      }
    );

    if (!res.ok) {
      throw new Error("You are not authorized!");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("Get Social Media error:", error.message);
    return { error: error.message };
  }
};

export const updateSocialMedia = async (socialMediaData: FormData) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${BASEURL}/social-media`,
      {
        method: "PATCH",
        body: socialMediaData,
        headers: {
          Authorization: token || "",
        },
      }
    );

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
export const deleteSocialMedia = async (socialMediaId: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    const res = await fetch(
      `${BASEURL}/social-media/${socialMediaId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token || "",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to delete Social Media");
    }

    revalidateTag("user-profile");

    return await res.json();
  } catch (error: any) {
    console.error("Delete Social Media error:", error.message);
    return { error: error.message };
  }
};
