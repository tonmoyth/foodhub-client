import {
  IconShoppingCart,
  IconCreditCard,
  IconReceipt,
  IconUser,
} from "@tabler/icons-react";

export const customerRoutes = [
  {
    title: "Cart",
    url: "/dashboard/cart",
    icon: IconShoppingCart,
  },
  {
    title: "Checkout",
    url: "/dashboard/checkout",
    icon: IconCreditCard,
  },
  {
    title: "My Orders",
    url: "/dashboard/orders",
    icon: IconReceipt,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: IconUser,
  },
];
