// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { availableGames, socials, subSidebar } from "@/lib/constants";
import { Separator } from "./ui/separator";

export function AppSidebar() {
  return (
    <Sidebar className="min-w-[240px] bg-grey-500">
      <SidebarContent className="bg-grey-500">
        <SidebarGroup className="h-full">
          <SidebarGroupLabel className="subheading flex h-[96px] justify-center px-4 py-8 uppercase text-white/100">
            Arcade
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex h-full flex-col content-between justify-between">
            <div>
              <SidebarMenu className="mx-auto max-w-[195px]">
                {availableGames.map((item) => (
                  <SidebarMenuItem key={item.title} className="max-w-[194px]">
                    <SidebarMenuButton
                      className="h-[50px] hover:bg-grey-400"
                      asChild
                    >
                      <a href={item.url}>
                        <span className="title text-white/100">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <Separator className="mx-auto my-7 bg-white/8 max-w-[195px]" />
              <SidebarMenu className="mx-auto max-w-[195px]">
                {subSidebar.map((item) => (
                  <SidebarMenuItem key={item.title} className="max-w-[194px]">
                    <SidebarMenuButton
                      className="h-[50px] hover:bg-grey-400"
                      asChild
                    >
                      <a href={item.url}>
                        <span className="title text-white/100">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
            <SidebarMenu className="mx-auto max-w-[195px] gap-4 p-2 pb-10">
              <p className="title text-white/100">Socials</p>
              <div className="flex flex-row gap-2">
                {socials.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="flex size-[40px] max-w-[194px] items-center justify-center rounded-full bg-white/32"
                  >
                    <SidebarMenuButton
                      className="h-[50px] hover:bg-grey-400"
                      asChild
                    >
                      <a
                        href={item.url}
                        className="flex items-center justify-center"
                      >
                        <span className="title text-white/100">
                          <item.icon className="size-[18px]" />
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
