import { initRating } from "../../rating";
import { ellipsis } from "../../utils";

export const LocationInfoWindow = (
    location,
    isEmpty,
    { onStartDirection, onAddWaypoint, onFinishDirection, onClose }
) => {
    const onStartClick = () => {
        onStartDirection();
        onClose && onClose();
    };

    const onAddPointClick = () => {
        onAddWaypoint();
        onClose && onClose();
    };

    const onFinishClick = () => {
        onFinishDirection();
        onClose && onClose();
    };

    const normalizeDescription = () => {
        const span = document.createElement("span");
        span.innerHTML = location.entity.description;
        return ellipsis(span.textContent, 100);
    };

    const node = new DOMParser().parseFromString(
        `
            <div class="point-card hover-card">
                <img class="hover-card__img" src="${
                    location.entity.thumbnain_image?.path ||
                    "/images/image-placeholder.png"
                }" alt="">

                <div class="map-card__info">
                    <a href="${
                        location.entity.url
                    }" target="_blank" class="text--medium hover-card__name">${
            location.entity.name
        }</a>
                    <div class="location__row">
                        <div class="location-rating" data-el="rating"></div>
                        <p class="hover-card__review location__rewiew">${
                            location.entity.reviews_count || 0
                        } rewiews</p>
                    </div>
                    <div class="hover-card__text">${normalizeDescription()}</div>
                    <div class="hover-card__buttons">
                        ${
                            isEmpty
                                ? `<button class="hover-card__btn hover-card__btn" data-el="start_route_button">Start route</button>`
                                : `<button class="hover-card__btn hover-card__btn" data-el="add_point_button">Add Point</button>`
                        }
                        <button class="hover-card__btn hover-card__btn--finish ${
                            isEmpty ? "btn--disabled" : ""
                        }" data-el="finish_route_button">Finish route</button>
                    </div>
                </div>
            </div>
        `,
        "text/html"
    );

    const ratingEl = node.querySelector('[data-el="rating"]');

    initRating(ratingEl, location.entity.rating || 0, 14, true);

    const startRouteButtonEl = node.querySelector(
        '[data-el="start_route_button"]'
    );
    const finishRouteButtonEl = node.querySelector(
        '[data-el="finish_route_button"]'
    );
    const addPointButtonEl = node.querySelector('[data-el="add_point_button"]');

    finishRouteButtonEl.disabled = isEmpty;

    startRouteButtonEl?.addEventListener("click", onStartClick);
    finishRouteButtonEl.addEventListener("click", onFinishClick);
    addPointButtonEl?.addEventListener("click", onAddPointClick);

    return node.body.children[0];
};
