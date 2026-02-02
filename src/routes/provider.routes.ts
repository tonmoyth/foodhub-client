import {
  IconInbox,
  IconMenu,
  IconPlus,
  IconLayoutDashboard,
} from "@tabler/icons-react";

export const providerRoutes = [
  {
    title: "dashboard",
    url: "/dashboard",
    icon: IconLayoutDashboard,
  },
  {
    title: "Make Provider Profile",
    url: "/dashboard/makeProvider",
    icon: IconLayoutDashboard,
  },
  {
    title: "Add Menu",
    url: "/dashboard/addmenu",
    icon: IconPlus,
  },
  {
    title: "View Menu",
    url: "/dashboard/viewmenu",
    icon: IconMenu,
  },
  {
    title: "Incoming Orders",
    url: "/dashboard/orders",
    icon: IconInbox,
  },
];
