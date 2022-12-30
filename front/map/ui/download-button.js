export const DownloadButton = (onDownload) => {
    const element = document.querySelector('[data-el="download-button"]');

    if (!element) {
        return;
    }

    element.addEventListener("click", async (event) => {
        try {
            event.preventDefault();
            event.stopPropagation();

            element.setAttribute("disabled", "true");

            await onDownload();

            element.setAttribute("disabled", "false");
        } catch (error) {
            element.setAttribute("disabled", "false");
        }
    });
};
