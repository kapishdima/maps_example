import React, { useEffect } from "react";

import { observer } from "mobx-react";

import { useLocationsStore } from "processes/locations";
import { useControl } from "shared/hooks";

export const MapInputManager: React.FC = observer(({ children }) => {
    const locationsStore = useLocationsStore();
    const { setValue } = useControl();

    useEffect(() => {
        setValue(
            "locations",
            locationsStore.selected.map(
                ({ location, includedInRoute }, index) => ({
                    id: location.id,
                    order: index,
                    include: includedInRoute,
                })
            )
        );
    }, [locationsStore.selected, locationsStore.selected.length]);

    return <>{children}</>;
});
