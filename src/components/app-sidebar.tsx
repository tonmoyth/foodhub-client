"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { customerRoutes } from "@/routes/customer.routes";
import { Route } from "@/types";
import Link from "next/link";
import { providerRoutes } from "@/routes/provider.routes";
import { adminRoutes } from "@/routes/admin.routes";
import { ROLE } from "@/constent/role";
import Image from "next/image";
import logoIcon from "../../public/logo.png";

interface userProfile {
  name: string;
  email: string;
}

export function AppSidebar({
  user,
  ...props
}: {
  user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
  let route: Route[] = [];

  if (user?.role === ROLE.customer) {
    route = customerRoutes;
  } else if (user?.role === ROLE.provider) {
    route = providerRoutes;
  } else if (user?.role === ROLE.admin) {
    route = adminRoutes;
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={logoIcon}
                  className="max-h-9 max-w-9 dark:invert"
                  alt="logo"
                />
                <span className="text-lg font-semibold tracking-tighter">
                  FoodHub
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={route} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
