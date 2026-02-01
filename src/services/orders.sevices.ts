import { env } from "@/env";
import { cookies } from "next/headers";

const ordersServices = {
  getUserOrders: async () => {
    const cookieStore = await cookies();

    try {
      const res = await fetch(`${env.API_URL}/api/orders`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      return data;
    } catch (error: any) {
      return { data: null, message: error?.message };
    }
  },

  getSingleOrder: async (id: string) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${env.API_URL}/api/orders/${id}`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      return data;
    } catch (error: any) {
      return { data: null, message: error?.message };
    }
  },

  getOrdersForProvider: async (id: string) => {
    const cookieStore = await cookies();
    try {
      const res = await fetch(`${env.API_URL}/api/orders/provider/${id}`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      return data;
    } catch (error: any) {
      return { data: null, message: error?.message };
    }
  },
};

export default ordersServices;
