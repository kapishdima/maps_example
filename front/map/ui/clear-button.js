export const ClearButton = (onClear) => {
    const element = document.querySelector('[data-el="clear-button"]');

    if (!element) {
        return;
    }

    element.addEventListener("click", onClear);
};
