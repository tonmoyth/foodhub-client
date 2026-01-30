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
