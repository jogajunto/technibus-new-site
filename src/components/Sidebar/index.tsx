import { Ads } from "@/components/Ads";
import { MostRead } from "@/components/MostRead";

export function Sidebar() {
  return (
    <aside className="space-y-6">
      <Ads variant="sidebarTopo" />
      <MostRead />
      <Ads variant="sidebarMeio" />
      <Ads variant="sidebarMeio2" />
      <Ads variant="sidebarBase" />
    </aside>
  );
}
