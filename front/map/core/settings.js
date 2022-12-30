import styles from "./styles.json";

import { startMarker } from "../icons/start_marker";
import { finishMarker } from "../icons/finish_marker";
import { hotels } from "../icons/hotels";
import { restaurants } from "../icons/resturants";
import { touristAttractions } from "../icons/tourist_attractions";
import { wineBars } from "../icons/wine_bars";
import { wineries } from "../icons/wineries";
import { waypointMarker } from "../icons/waypoint_marker";

const svgToDataurl = (svg) =>
    "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);

const markerIcons = {
    start_point: (fillColor) => svgToDataurl(startMarker(fillColor)),
    finish_point: (fillColor) => svgToDataurl(finishMarker(fillColor)),
    "horeca.hotel": (fillColor) => svgToDataurl(hotels(fillColor)),
    "horeca.restaurant": (fillColor) => svgToDataurl(restaurants(fillColor)),
    "horeca.hotel_restaurant": (fillColor) =>
        svgToDataurl(restaurants(fillColor)),
    "horeca.family_style_restaurant": (fillColor) =>
        svgToDataurl(restaurants(fillColor)),
    "horeca.steakhouse": (fillColor) => svgToDataurl(restaurants(fillColor)),
    "horeca.cafe_wine_bar": (fillColor) => svgToDataurl(wineBars(fillColor)),
    "horeca.wine_bar": (fillColor) => svgToDataurl(wineBars(fillColor)),
    "horeca.armenian_restaurant": (fillColor) =>
        svgToDataurl(restaurants(fillColor)),
    "horeca.georgian_restaurant": (fillColor) =>
        svgToDataurl(restaurants(fillColor)),
    "horeca.ukrainian_restaurant": (fillColor) =>
        svgToDataurl(restaurants(fillColor)),
    "horeca.greek_restaurant": (fillColor) =>
        svgToDataurl(restaurants(fillColor)),
    attraction: (fillColor) => svgToDataurl(touristAttractions(fillColor)),
    winery: (fillColor) => svgToDataurl(wineries(fillColor)),
    waypoint: (fillColor, strokeColor, textColor, order) =>
        svgToDataurl(waypointMarker(order, fillColor, strokeColor, textColor)),
};

export const mapSettings = {
    styles,
    markerIcons,
    zoom: 4,
    maxZoom: 100,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    defaulMarkerFillColor: "#202645",
    activeMarkerColor: "#A71E3B",
};

export const mapCenters = {
    georgia: {
        coords: {
            lat: 41.7323742,
            lng: 44.6987685,
        },
        zoom: 7,
    },
    ukraine: {
        coords: { lat: 46.7087788, lng: 30.5882763 },
        zoom: 7,
    },
    armenia: {
        coords: { lat: 40.1533693, lng: 44.418527 },
        zoom: 7,
    },
    greece: {
        coords: { lat: 40.9260275, lng: 23.4370129 },
        zoom: 7,
    },
};
