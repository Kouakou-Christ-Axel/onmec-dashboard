import {AppSidebar} from "@/components/(protected)/dashboard/common/app-sidebar";
import {SiteHeader} from "@/components/(protected)/dashboard/site-header";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="overflow-x-auto">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
