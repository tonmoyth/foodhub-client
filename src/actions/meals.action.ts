"use server";

import mealsServices, { IParamsTypes } from "@/services/meals.services";
import ordersServices from "@/services/orders.sevices";
import { OrderPayload } from "@/types";

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
