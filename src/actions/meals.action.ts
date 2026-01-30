"use server";

import mealsServices, { IParamsTypes } from "@/services/meals.services";

export async function getAllMeals(params?: IParamsTypes) {
  return await mealsServices.getAllMeals(params);
}

export async function getSingleMeal(id: string) {
  return await mealsServices.getSignleMeal(id);
}
