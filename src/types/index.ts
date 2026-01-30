import { Icon } from "@tabler/icons-react";

export interface IAddToCardType {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  providerId: string;
}

export interface Route {
  title: string;
  url: string;
  icon?: Icon;
}

export interface OrderPayload {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  mealsId: string; // single meal id (cart[0].id)
  providerProfileId: string; // provider id (cart[0].providerId)
  totalAmount: number;
}
