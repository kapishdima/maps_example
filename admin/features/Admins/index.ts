import { AdminsFilters } from "./ui/AdminsFilters";
import { AdminsTable } from "./ui/AdminsTable";
import { useFetchAdmins } from "./hooks/useFetchAdmins";
import { useCreateAdmin } from "./hooks/useCreateAdmin";

import { AdminsServiceProvider } from "./providers/AdminsServiceProvider";
import { AdminsViewContent } from "./ui/AdminsViewContent";
import { AdminEditContent } from "./ui/AdminEditContent";
import { AdminCreateContent } from "./ui/AdminCreateContent";

export {
    AdminsServiceProvider,
    AdminsViewContent,
    AdminEditContent,
    AdminCreateContent,
    AdminsFilters,
    AdminsTable,
    useFetchAdmins,
    useCreateAdmin,
};
