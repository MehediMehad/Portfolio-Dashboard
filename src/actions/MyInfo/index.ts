"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const updateProfile = async (userData: FormData): Promise<any> => {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/user/update-profile`,
      {
        method: "PUT",
        body: userData,
        headers: {
          Authorization: token || "",
        },
      }
    );

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

//  get all brands
export const getMyInfo = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      next: {
        tags: ["MYINFO"],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error.message);
  }
};
