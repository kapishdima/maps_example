import { action, makeObservable, observable } from "mobx";
import { Filter, SelectedFilter } from "./filters";

export class FiltersStore {
    selectedFilters: SelectedFilter[] = [];

    constructor() {
        makeObservable(this, {
            selectedFilters: observable,
            selectFilter: action("Select filter"),
            unselectFilter: action("Unselect filter"),
            clearFilters: action("Remove all filters"),
            changeFilterValue: action("Change value to specific filter"),
        });
    }

    clearFilters() {
        this.selectedFilters = [];
    }

    selectFilter(filter: SelectedFilter) {
        if (this.isExits(filter)) {
            return;
        }
        this.selectedFilters.push(filter);
    }

    unselectFilter(filter: SelectedFilter) {
        this.selectedFilters = this.selectedFilters.filter(
            (selectedFilter) => selectedFilter !== filter
        );
    }

    isExits(filter: SelectedFilter) {
        return Boolean(
            this.selectedFilters.find(
                (selectedFilter) => selectedFilter.name === filter.name
            )
        );
    }

    changeFilterValue(name: string, value: any) {
        const filter = this.getFilterByName(name);

        if (!filter || !this.isExits(filter)) {
            return;
        }

        this.selectedFilters = this.selectedFilters.map((selectedFilter) => {
            if (selectedFilter.name === filter.name) {
                return {
                    ...selectedFilter,
                    value,
                };
            }

            return selectedFilter;
        });
    }

    getFilterByName(name: string) {
        return this.selectedFilters.find(
            (selectedFilter) => selectedFilter.Component.props.name === name
        );
    }

    getSelectedFilters() {
        return this.selectedFilters;
    }

    getFiltersForApi() {
        return this.selectedFilters.map((filter) => ({
            [filter.Component.props.name]: filter.value,
        }));
    }
}
