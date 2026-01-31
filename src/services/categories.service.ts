import { env } from "@/env";
import { cookies } from "next/headers";

const categoriesService = {
  getAllCategories: async () => {
    const cookieStore = await cookies();

    try {
      const res = await fetch(`${env.API_URL}/api/categories`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const categories = await res.json();

      return categories;
    } catch (error: any) {
      console.log(error);
      return { seesion: null, message: error.message };
    }
  },
};

export default categoriesService;
