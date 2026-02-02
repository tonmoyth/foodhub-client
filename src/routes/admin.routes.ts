import {
  IconUsers,
  IconClipboardList,
  IconCategory,
  IconLayoutDashboard,
} from "@tabler/icons-react";

export const adminRoutes = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: IconUsers,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: IconClipboardList,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: IconCategory,
  },
];
