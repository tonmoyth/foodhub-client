import { env } from "@/env";
import { cookies } from "next/headers";

const statisticsService = {
  getAdminStatistics: async () => {
    const cookieStore = await cookies();

    try {
      const res = await fetch(`${env.API_URL}/api/admin/users/statistics`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const statistics = await res.json();

      return statistics;
    } catch (error: any) {
      return { seesion: null, message: error.message };
    }
  },
};

export default statisticsService;
