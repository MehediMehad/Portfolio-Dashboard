import { updateProfile } from "@/actions/MyInfo";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const result = await updateProfile(formData);

  if (result.error) {
    return Response.json({ success: false, error: result.error });
  }

  return Response.json({ success: true, data: result });
}
