"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "./_components/header";
import { usePathname } from "next/navigation";
import { EArcadeRoutes, ArcadeTitles } from "@/lib/enum";

export default function Layout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname() as EArcadeRoutes;
  const title = ArcadeTitles[pathname] || "CorePlay";

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Header title={title} />
        <main>
          {/* <SidebarTrigger  /> */}
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
