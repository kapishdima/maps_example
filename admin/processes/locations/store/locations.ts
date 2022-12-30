import { action, makeObservable, observable } from "mobx";
import { LocationViewEntity } from "entities/location";

export type SelectedLocation = {
    location: LocationViewEntity;
    includedInRoute: boolean;
};

export class LocationsStore {
    selected: SelectedLocation[] = [];

    constructor() {
        makeObservable(this, {
            selected: observable,
            selectOne: action("Select single location"),
            selectMany: action("Select many locations"),
            includeInRoute: action(
                "Set includedInRoute to true, for specific location"
            ),
            excludeFromRoute: action(
                "Set includedInRoute to false, for specific location"
            ),
            unselect: action("Unselect location"),
            move: action("Move selected from index to index"),
        });
    }

    public selectOne(location: LocationViewEntity) {
        this.selected.push({
            location,
            includedInRoute: location.include,
        });
    }

    public selectMany(locations: LocationViewEntity[]) {
        this.selected = locations.map((location) => ({
            location,
            includedInRoute: location.include,
        }));
    }

    public unselect(location: LocationViewEntity) {
        this.selected = this.selected.filter(
            ({ location: selectedLocation }) =>
                selectedLocation.id !== location.id
        );
    }

    public includeInRoute(location: LocationViewEntity) {
        this.selected = this.selected.map((selectedLocation) => {
            if (selectedLocation.location.id === location.id) {
                return {
                    location,
                    includedInRoute: true,
                };
            }
            return selectedLocation;
        });
    }

    public excludeFromRoute(location: LocationViewEntity) {
        this.selected = this.selected.map((selectedLocation) => {
            if (selectedLocation.location.id === location.id) {
                return {
                    location,
                    includedInRoute: false,
                };
            }
            return selectedLocation;
        });
    }

    public isIncludedInRoute(location: LocationViewEntity) {
        return this.selected.find(
            (selectedLocation) => selectedLocation.location.id === location.id
        )?.includedInRoute;
    }

    public move(from: number, to: number) {
        const fromItem = this.selected[from];
        const toItem = this.selected[to];

        let tempSelected = this.selected;

        tempSelected[from] = toItem;
        tempSelected[to] = fromItem;

        this.selected = tempSelected;

        return this.selected;
    }

    public getLocations() {
        return this.selected.map(({ location }) => location);
    }
}
