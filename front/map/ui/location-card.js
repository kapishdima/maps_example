import { LocationRound } from "./location-round";
import { initRating } from "../../rating";
import { getTranslations } from "../utils";

export const LocationListWithCountryName = (countryName, locations) => {
    const node = new DOMParser().parseFromString(
        `<div class="locations-list__wrapper">
            <h3 class="black-sea__way-title">${countryName}</h3>
        </div>`,
        "text/html"
    );

    const translations = getTranslations();

    locations.forEach((location) => {
        const locationCardNode = new DOMParser().parseFromString(
            `
                <div class="map-card map-wrapper__card">
                    <div class="img-container">
                        ${LocationRound(location, location.order)}
                    </div>
                    <div class="location">
                        <img class="map-card__img" src="${
                            location.entity.thumbnail_image?.path ||
                            "/images/image-placeholder.png"
                        }">

                        <div class="map-card__info">
                            <h3 class="title--small map-card__name">${
                                location.entity.name
                            }</h3>
                            <div class="location-rating" data-el="rating"></div>
                            <a href="${
                                location.entity.url || ""
                            }" class="text--small map-card__link">${
                translations.more_details
            }</a>
                        </div>

                    </div>
                </div>
            `,
            "text/html"
        );

        node.body.children[0].insertAdjacentElement(
            "beforeend",
            locationCardNode.body.children[0]
        );
    });

    return node.body;
};

export const LocationCard = (
    location,
    order,
    { withDeleteButton, onDeleteLocation }
) => {
    const translations = getTranslations();
    const node = new DOMParser().parseFromString(
        `
        <div class="create__location">
            <div class="img-container">
                ${LocationRound(location, order)}
            </div>

            <div class="location">
                <img class="map-card__img" src="${
                    location.entity.thumbnail_image?.path ||
                    "/images/image-placeholder.png"
                }">

                <div class="map-card__content">
                    <div class="map-card__header">
                        <div class="map-card__info">
                            <h3 class="title--small map-card__name">${
                                location.entity.name
                            }</h3>
                            ${
                                location.entity_type === "winery"
                                    ? `
                                        <div class="location__row">
                                            <div class="location-rating" data-el="rating"></div>
                                            <p class="location__rewiew">${
                                                location.entity.reviews_count ||
                                                0
                                            } rewiews</p>
                                        </div>
                                    `
                                    : ""
                            }

                        </div>
                    </div>

                    <div class="map-card__footer">
                        ${
                            location.entity_type === "winery"
                                ? `<a href="${
                                      location.entity.url || ""
                                  }" class="text--small map-card__link" target="_blank">${
                                      translations.more_details
                                  }</a>`
                                : ""
                        }
                    </div>
                </div>

                ${
                    withDeleteButton
                        ? `<svg
                            class="location__close-button"
                            width="17"
                            data-el="remove-button"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 1L16 16"
                                stroke="#202645"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                            <path
                                d="M16 1L1 16"
                                stroke="#202645"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                        </svg>`
                        : ""
                }



            </div>

            <span class="create__line"></span>
            <span class="create__line"></span>
        </div>
    `,
        "text/html"
    );

    const ratingEl = node.querySelector('[data-el="rating"]');
    const deleteButton = node.querySelector('[data-el="remove-button"]');

    if (ratingEl) {
        initRating(ratingEl, parseInt(location.entity.rating) || 0, 14, true);
    }

    deleteButton?.addEventListener("click", () =>
        onDeleteLocation ? onDeleteLocation(location) : null
    );

    return node.body.children[0];
};
