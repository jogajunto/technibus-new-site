import { Ads } from "@/components/Ads";
import { MostRead } from "@/components/MostRead";

export function Sidebar() {
  return (
    <aside className="space-y-6">
      <Ads position="sidebar-top" />
      <MostRead />
      <Ads position="sidebar-middle" />
      <Ads position="sidebar-bottom-premium" />
    </aside>
  );
}
