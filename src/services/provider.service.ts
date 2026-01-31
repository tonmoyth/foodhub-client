import { env } from "@/env";
import { cookies } from "next/headers";

const providerService = {
  getSignleProvider: async () => {
    const cookieStore = await cookies();

    try {
      const res = await fetch(`${env.API_URL}/api/providers/single`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const provider = await res.json();

      return provider;
    } catch (error: any) {
      console.log(error);
      return { seesion: null, message: error.message };
    }
  },
};

export default providerService;
