"use server";

import categoriesService from "@/services/categories.service";
import mealsServices, { IParamsTypes } from "@/services/meals.services";
import ordersServices from "@/services/orders.sevices";
import providerService from "@/services/provider.service";
import statisticsService from "@/services/statistics.service";
import userService from "@/services/user.service";
import { OrderPayload } from "@/types";
import { cookies } from "next/headers";
import { env } from "@/env";

export async function getAllMeals(params?: IParamsTypes) {
  return await mealsServices.getAllMeals(params);
}

export async function getSingleMeal(id: string) {
  return await mealsServices.getSignleMeal(id);
}

export async function getUserOrders() {
  return await ordersServices.getUserOrders();
}

export async function getSignleOrders(id: string) {
  return await ordersServices.getSingleOrder(id);
}

export async function getCurrentUser() {
  return await userService.getCurrentUser();
}

export async function getAllCategories() {
  return await categoriesService.getAllCategories();
}

export async function getSignleProvider() {
  return await providerService.getSignleProvider();
}

export async function getMealsByProvider() {
  return await mealsServices.getMealsByProvider();
}

export async function getOrdersForProvider(id: string) {
  return await ordersServices.getOrdersForProvider(id);
}

export async function getAllUsers() {
  return await userService.getAllUsers();
}

export async function getAllOrdersForAdmin() {
  return await ordersServices.getAllOrdersForAdmin();
}

export async function getAdminStatistics() {
  return await statisticsService.getAdminStatistics();
}

export async function getProviderStatistics() {
  return await statisticsService.getProviderStatistics();
}

export async function getProviderwithMenu(id: string) {
  return await providerService.getProviderwithMenu(id);
}

export async function createMeal(formData: FormData) {
  const cookieStore = await cookies();

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const discount_price = parseFloat(formData.get("discount_price") as string);
  const categoriesId = formData.get("categoriesId") as string;
  const image = formData.get("image") as string;
  const is_available = formData.get("is_available") === "true";
  const prep_time_minute = formData.get("prep_time_minute") as string;
  const providerProfileId = formData.get("providerProfileId") as string;

  const payload = {
    title,
    description,
    price,
    discount_price,
    categoriesId,
    image,
    is_available,
    prep_time_minute,
    providerProfileId,
  };

  try {
    const res = await fetch(`${env.API_URL}/api/provider/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to create meal");
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function placeOrder(formData: FormData) {
  const cookieStore = await cookies();

  const customerName = formData.get("customerName") as string;
  const customerPhone = formData.get("customerPhone") as string;
  const deliveryAddress = formData.get("deliveryAddress") as string;
  const mealsId = formData.get("mealsId") as string;
  const providerProfileId = formData.get("providerProfileId") as string;
  const totalAmount = parseFloat(formData.get("totalAmount") as string);

  const payload = {
    customerName,
    customerPhone,
    deliveryAddress,
    mealsId,
    providerProfileId,
    totalAmount,
  };

  try {
    const res = await fetch(`${env.API_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to place order");
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function submitReview(formData: FormData) {
  const cookieStore = await cookies();

  const mealId = formData.get("mealId") as string;
  const orderId = formData.get("orderId") as string;
  const rating = parseInt(formData.get("rating") as string);
  const comment = formData.get("comment") as string;

  const payload = {
    mealId,
    orderId,
    rating,
    comment,
  };

  try {
    const res = await fetch(`${env.API_URL}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to submit review");
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function toggleUserStatus(formData: FormData) {
  const cookieStore = await cookies();

  const userId = formData.get("userId") as string;
  const status = formData.get("status") as string;

  const payload = { status };

  try {
    const res = await fetch(`${env.API_URL}/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Update failed");
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function createCategory(formData: FormData) {
  const cookieStore = await cookies();

  const name = formData.get("name") as string;
  const slug = formData.get("slug") as string;

  const payload = { name, slug };

  try {
    const res = await fetch(`${env.API_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed create");
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateMeal(formData: FormData) {
  const cookieStore = await cookies();

  const mealId = formData.get("mealId") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const discount_price = parseFloat(formData.get("discount_price") as string);
  const categoriesId = formData.get("categoriesId") as string;
  const image = formData.get("image") as string;
  const is_available = formData.get("is_available") === "true";
  const prep_time_minute = formData.get("prep_time_minute") as string;

  // Fetch provider data
  const providerRes = await fetch(`${env.API_URL}/api/providers/single`, {
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  if (!providerRes.ok) {
    throw new Error("Failed to get provider");
  }

  const { data } = await providerRes.json();
  const providerProfileId = data.id;

  const payload = {
    title,
    description,
    price,
    discount_price,
    categoriesId,
    image,
    is_available,
    prep_time_minute,
    providerProfileId,
  };

  try {
    const res = await fetch(`${env.API_URL}/api/provider/meals/${mealId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update meal");
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteMeal(formData: FormData) {
  const cookieStore = await cookies();

  const mealId = formData.get("mealId") as string;

  try {
    const res = await fetch(`${env.API_URL}/api/provider/meals/${mealId}`, {
      method: "DELETE",
      headers: {
        cookie: cookieStore.toString(),
      },
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Delete failed");
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateOrderStatus(formData: FormData) {
  const cookieStore = await cookies();

  const orderId = formData.get("orderId") as string;
  const status = formData.get("status") as string;

  const payload = { status };

  try {
    const res = await fetch(`${env.API_URL}/api/provider/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to update status");
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
