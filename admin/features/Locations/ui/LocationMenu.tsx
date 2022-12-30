import React from "react";

import {
    ArrowDownIcon,
    ArrowUpIcon,
    CrossIcon,
    IconButton,
    Pane,
} from "evergreen-ui";

import { useLocationsStore } from "processes/locations";
import { LocationViewEntity } from "entities/location";
import { useControl } from "shared/hooks";

type LocationMenuProps = {
    location: LocationViewEntity;
    index: number;
    onClick: () => void;
};

export const LocationMenu: React.FC<LocationMenuProps> = ({
    location,
    index,
    onClick,
}) => {
    const locationsStore = useLocationsStore();
    const { setValue } = useControl();

    const moveUp = () => {
        const to = index - 1;
        const reordered = locationsStore.move(index, to);
        setValue(
            "locations",
            reordered.map(({ location, includedInRoute }, index) => ({
                id: location.id,
                order: index,
                include: includedInRoute,
            }))
        );
        onClick();
    };

    const moveDown = () => {
        const to = index + 1;
        const reordered = locationsStore.move(index, to);
        setValue(
            "locations",
            reordered.map(({ location, includedInRoute }, index) => ({
                id: location.id,
                order: index,
                include: includedInRoute,
            }))
        );
        onClick();
    };

    const onDelete = () => {
        locationsStore.unselect(location);

        onClick();
    };

    return (
        <Pane
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
        >
            <IconButton
                icon={ArrowUpIcon}
                appearance="minimal"
                type="button"
                onClick={moveUp}
            />
            <IconButton
                icon={ArrowDownIcon}
                appearance="minimal"
                type="button"
                onClick={moveDown}
            />
            <IconButton
                icon={CrossIcon}
                appearance="minimal"
                intent="danger"
                type="button"
                onClick={onDelete}
            />
        </Pane>
    );
};
function setValue(arg0: string, arg1: any) {
    throw new Error("Function not implemented.");
}
