import { hotNetworkItems, popularTags } from "@/lib/mock-data";
import { HotNetwork } from "../hot-network";
import { PopularTags } from "../popular-tags";

const RightSidebar = () => (
  <aside className="h-screen overflow-y-scroll space-y-5 bg-white dark:bg-background pt-20 w-[330px] fixed right-0 top-0 z-20 flex flex-col">
    <HotNetwork items={hotNetworkItems} />
    <PopularTags tags={popularTags} />
  </aside>
);

export default RightSidebar;
