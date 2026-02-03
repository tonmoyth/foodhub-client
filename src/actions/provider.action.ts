"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateProvider(formData: FormData) {
  const cookieStore = await cookies();

  const res_name = formData.get("res_name") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;
  const description = formData.get("description") as string;
  const city = formData.get("city") as string;

  const payload = { res_name, address, phone, description, city };

  try {
    const res = await fetch(`${env.API_URL}/api/providers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update provider");
    }

    revalidatePath("/dashboard/addmenu");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
