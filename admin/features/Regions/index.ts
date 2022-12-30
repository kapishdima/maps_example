import { RegionsTable } from "./ui/RegionsTable";
import { useFetchRegions } from "./hooks/useFetchRegions";
import { useCreateRegion } from "./hooks/useCreateRegion";

import { RegionsServiceProvider } from "./providers/RegionsServiceProvider";
import { RegionsViewContent } from "./ui/RegionsViewContent";
import { RegionsEditContent } from "./ui/RegionsEditContent";
import { RegionCreateContent } from "./ui/RegionsCreateContent";

export {
    RegionsServiceProvider,
    RegionsViewContent,
    RegionsEditContent,
    RegionCreateContent,
    RegionsTable,
    useFetchRegions,
    useCreateRegion,
};
