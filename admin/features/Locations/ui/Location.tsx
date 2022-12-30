import React, { useState } from "react";

import {
    Badge,
    Checkbox,
    Heading,
    IconButton,
    majorScale,
    minorScale,
    MoreIcon,
    Pane,
    Popover,
    Position,
} from "evergreen-ui";
import { LocationViewEntity } from "entities/location";
import { useCommonDataContext } from "app/hooks";
import { useLocationsStore } from "processes/locations";

import { LocationMenu } from "./LocationMenu";
import { useControl } from "shared/hooks";

type LocationProps = {
    location: LocationViewEntity;
    includedInRoute: boolean;
    canExcludeFromRoute: boolean;
    isFirst?: boolean;
    isLast?: boolean;
    index: number;
};

const toCapitalize = (str: string) => {
    return str.replace(/./, (letter) => letter.toUpperCase());
};

export const Location: React.FC<LocationProps> = ({
    location,
    includedInRoute,
    canExcludeFromRoute,
    isFirst,
    isLast,
    index,
}) => {
    const [checked, setChecked] = useState(includedInRoute);
    const { generalLocale } = useCommonDataContext();
    const locationStore = useLocationsStore();
    const { setValue } = useControl();

    const onCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;

        setChecked(checked);

        if (checked) {
            locationStore.includeInRoute(location);
        } else {
            locationStore.excludeFromRoute(location);
        }
    };

    return (
        <Pane
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            background="#fff"
            borderRadius={majorScale(1)}
            border
            padding={majorScale(2)}
            maxWidth="90%"
            minWidth="90%"
            marginBottom={majorScale(1)}
        >
            <Pane width="100%">
                <Pane
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    marginBottom={minorScale(3)}
                >
                    <Pane display="flex" alignItems="center">
                        <Pane
                            display="flex"
                            alignItems="center"
                            columnGap={minorScale(1)}
                        >
                            {isFirst && <Badge color="blue">Start point</Badge>}
                            {isLast && <Badge color="blue">Finish point</Badge>}
                            {!isLast && !isFirst && (
                                <Badge color="blue">Waypoint</Badge>
                            )}
                            {location.type ? (
                                <Badge color="green">
                                    {toCapitalize(location.type)}
                                </Badge>
                            ) : null}
                            <Badge>{location.country.code}</Badge>
                        </Pane>
                    </Pane>
                    <Popover
                        position={Position.RIGHT}
                        minWidth="max-content"
                        minHeight={majorScale(4)}
                        content={({ close }) => (
                            <LocationMenu
                                onClick={() => {
                                    close();
                                }}
                                index={index}
                                location={location}
                            />
                        )}
                    >
                        <IconButton
                            icon={MoreIcon}
                            appearance="minimal"
                            type="button"
                        />
                    </Popover>
                </Pane>
                <Heading size={300} marginBottom={majorScale(1)}>
                    {location.name}
                </Heading>
                <Heading size={200} marginBottom={majorScale(1)}>
                    {typeof location.address === "string"
                        ? location.address
                        : location.address[generalLocale.id]}
                </Heading>
                <Pane
                    display="flex"
                    flexDirection="column"
                    rowGap={minorScale(1)}
                >
                    <Heading size={100}>Plus Code: {location.plusCode}</Heading>
                    <Heading size={100}>Lat: {location.lat}</Heading>
                    <Heading size={100}>Lng: {location.lng}</Heading>
                </Pane>
                <Checkbox
                    disabled={!canExcludeFromRoute}
                    label="Include to route?"
                    checked={checked}
                    onChange={onCheck}
                />
            </Pane>
        </Pane>
    );
};
