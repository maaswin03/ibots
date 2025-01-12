import * as React from "react"
import {
  ShoppingCart,
  Command,
  Users,
  LifeBuoy,
  Box,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin",
    email: "admin@ibots.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      items: [],
    },
    {
      title: "Products",
      url: "/",
      icon: Box,
      items: [
        { title: "All Products", url: "/" },
        { title: "Categories", url: "/" },
        { title: "Add New", url: "/" },
        { title: "Stock Management", url: "/" },
      ],
    },
    {
      title: "Orders",
      url: "/",
      icon: ShoppingCart,
      items: [
        { title: "All Orders", url: "/" },
        { title: "Pending Orders", url: "/" },
        { title: "Completed Orders", url: "/" },
        { title: "Returns", url: "/" },
      ],
    },
    {
      title: "Customers",
      url: "/",
      icon: Users,
      items: [
        { title: "All Customers", url: "/" },
        { title: "Feedback", url: "/" },
        { title: "Support Tickets", url: "/" },
      ],
    },
    {
      title: "Reports",
      url: "/",
      icon: PieChart,
      items: [
        { title: "Sales Report", url: "/" },
        { title: "Product Performance", url: "/" },
        { title: "Customer Insights", url: "/" },
      ],
    },
    {
      title: "Settings",
      url: "/",
      icon: Settings2,
      items: [
        { title: "General Settings", url: "/" },
        { title: "Account Settings", url: "/" },
        { title: "Payment Options", url: "/" },
        { title: "Shipping Settings", url: "/" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/",
      icon: Send,
    },
  ],
  projects: [],
};


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">iBots</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
