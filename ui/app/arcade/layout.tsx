import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "./components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <Header />
        <main>
          {/* <SidebarTrigger  /> */}
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
