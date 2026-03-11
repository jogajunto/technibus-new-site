import { createMetadata } from "@/utilities/create-metadata";

import { Ads } from "@/components/Ads";

export function generateMetadata() {
  return createMetadata({
    path: "/ads",
    title: "Ads",
    description: "...",
    noIndex: true,
  });
}

export default function Page() {
  return (
    <main>
      <div className="section pt-4">
        <div className="container flex flex-col gap-4">
          <Ads variant="sidebarTopo" />
          <Ads variant="sidebarMeio" />
          <Ads variant="sidebarMeio2" />
          <Ads variant="sidebarBase" />
        </div>
      </div>
    </main>
  );
}
