import { env } from "@/env";
import { cookies } from "next/headers";

const userService = {
  getSession: async () => {
    const cookieStore = await cookies();

    try {
      const res = await fetch(`${env.AUTH_API}/get-session`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();
      if (session === null) {
        return { session: null, message: "session not found" };
      }
      return session;
    } catch (error: any) {
      return { seesion: null, message: error.message };
    }
  },
  getCurrentUser: async () => {
    const cookieStore = await cookies();

    try {
      const res = await fetch(`${env.AUTH_API}/auth/me`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const user = await res.json();
      console.log(user);

      // if (session === null) {
      //   return { session: null, message: "session not found" };
      // }
      return user;
    } catch (error: any) {
      console.log(error);
      return { seesion: null, message: error.message };
    }
  },
};

export default userService;
