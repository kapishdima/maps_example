import { openCreateRoute } from "../../open-buttons";

export const CreateButton = (onCreate) => {
    const element = document.querySelector('[data-el="create_route_button"]');

    if (!element) {
        return;
    }

    element.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        openCreateRoute();
        onCreate();
    });
};
