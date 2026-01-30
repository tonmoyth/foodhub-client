import { env } from "@/env";

export interface IParamsTypes {
  search?: string;
  categoriesId?: string;
}

const mealsServices = {
  getAllMeals: async (params?: IParamsTypes) => {
    try {
      const url = new URL(`${env.API_URL}/api/meals`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error: any) {
      return { data: null, message: error?.message };
    }
  },

  getSignleMeal: async (id: string) => {
    try {
      const res = await fetch(`${env.API_URL}/api/meals/${id}`);
      const data = await res.json();
      return data;
    } catch (error: any) {
      return { data: null, message: error?.message };
    }
  },
};

export default mealsServices;
