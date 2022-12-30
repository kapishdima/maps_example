import React from "react";

import { majorScale, Pane } from "evergreen-ui";
import { observer } from "mobx-react";

import { Location } from "./Location";
import { useLocationsStore } from "processes/locations";

export const LocationList: React.FC = observer(() => {
    const locationsStore = useLocationsStore();

    return (
        <Pane
            padding={majorScale(1)}
            minWidth="100%"
            maxWidth="100%"
            maxHeight="50vh"
            overflowY="auto"
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
        >
            {locationsStore.selected.map(
                ({ location, includedInRoute }, index) => (
                    <Location
                        index={index}
                        key={location.id}
                        location={location}
                        includedInRoute={includedInRoute}
                        isFirst={index === 0}
                        isLast={index === locationsStore.selected.length - 1}
                        canExcludeFromRoute={
                            index > 0 &&
                            index < locationsStore.selected.length - 1
                        }
                    />
                )
            )}
        </Pane>
    );
});
