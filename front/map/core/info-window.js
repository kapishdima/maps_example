import {
    otherInfoWindowTemplate,
    wineryInfoWindowTemplate,
} from "../ui/info-window.template";

let prevInfoWindow = null;

export const renderAndOpenLocationInfoWindow = (marker, map, location) => {
    const contentElement =
        location.entity_type === "winery"
            ? wineryInfoWindowTemplate(location)
            : otherInfoWindowTemplate(location);

    const infoWindow = createInfoWindow(contentElement);
    openInfoWindow(infoWindow, marker, map);
};

export const createInfoWindow = (content) => {
    return new google.maps.InfoWindow({
        content,
    });
};

export const closeInfoWindow = () => {
    if (!prevInfoWindow) {
        return;
    }

    prevInfoWindow.close();
};

export const openInfoWindow = (infoWindow, marker, map, onClose) => {
    onClose ? onClose(prevInfoWindow) : closeInfoWindow();

    infoWindow.open({
        anchor: marker,
        map,
        shouldFocus: true,
    });

    prevInfoWindow = infoWindow;
};
