import { ellipsis } from "../../utils";
import { getTranslations } from "../utils";

export const WaysList = (ways, defaultSelectedIndex, onWaySelected) => {
    const root = document.querySelector('[data-el="locations-list"]');
    const translations = getTranslations();

    if (!root) {
        return;
    }

    root.innerHTML = "";

    if (defaultSelectedIndex !== null) {
        root.dataset.selectedWay = defaultSelectedIndex;
    }

    const nodes = ways.map((way, index) => {
        const node = new DOMParser().parseFromString(
            `
                <div class="map-card way-card__item  ${
                    parseInt(root.dataset.selectedWay) === index
                        ? "way-card__item--selected"
                        : ""
                }">
                    <img src="${
                        way.thumbnail?.compressed_path ||
                        "/images/image-placeholder.png"
                    }" alt=""
                        class="map-card__img">
                    <div class="way-card__content">
                        <div class="way-card__header">
                            <h3 class="title--small way-card__name">${
                                way.name || ""
                            }</h3>
                        </div>

                        <div class="way-card__footer">
                            <p class="text--regular way-card__text">${
                                ellipsis(way.text, 100) || ""
                            }</p>

                            <div class="way-card__row">
                                <a href="${
                                    way.url || ""
                                }" class="text--small map-card__link" target="_blank">${
                translations.more_details
            }</a>

                                <a href="${
                                    way.pdf_url || ""
                                }" class="way-card__dwnld" target="_blank">
                                    <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M4.125 13.6562H3.75V11.5H4.125C4.74844 11.5 5.25 11.9807 5.25 12.5781C5.25 13.1756 4.74844 13.6562 4.125 13.6562ZM9 11.5H9.375C9.7875 11.5 10.125 11.8234 10.125 12.2188V15.0938C10.125 15.4891 9.7875 15.8125 9.375 15.8125H9V11.5ZM10.5 0V5.75C10.5 6.54512 11.1703 7.1875 12 7.1875H18V20.125C18 21.7107 16.6547 23 15 23H3C1.34297 23 0 21.7107 0 20.125V2.875C0 1.28701 1.34297 0 3 0H10.5ZM3 10.0625C2.58562 10.0625 2.25 10.3859 2.25 10.7812V16.5312C2.25 16.9266 2.58562 17.25 3 17.25C3.41438 17.25 3.75 16.9266 3.75 16.5312V15.0938H4.125C5.57344 15.0938 6.75 13.9662 6.75 12.5781C6.75 11.19 5.57344 10.0625 4.125 10.0625H3ZM7.5 16.5312C7.5 16.9266 7.8375 17.25 8.25 17.25H9.375C10.6172 17.25 11.625 16.2842 11.625 15.0938V12.2188C11.625 11.0283 10.6172 10.0625 9.375 10.0625H8.25C7.8375 10.0625 7.5 10.3859 7.5 10.7812V16.5312ZM13.5 10.0625C13.0875 10.0625 12.75 10.3859 12.75 10.7812V16.5312C12.75 16.9266 13.0875 17.25 13.5 17.25C13.9125 17.25 14.25 16.9266 14.25 16.5312V14.375H15.75C16.1625 14.375 16.5 14.0516 16.5 13.6562C16.5 13.2609 16.1625 12.9375 15.75 12.9375H14.25V11.5H15.75C16.1625 11.5 16.5 11.1766 16.5 10.7812C16.5 10.3859 16.1625 10.0625 15.75 10.0625H13.5ZM12 0L18 5.75H12V0Z"
                                            fill="#202645" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                   </div>
                </div>
            `,
            "text/html"
        ).body.children[0];

        root.insertAdjacentElement("beforeend", node);

        node.addEventListener("click", () => {
            root.dataset.selectedWay = index;
            nodes.forEach((node) =>
                node.classList.remove("way-card__item--selected")
            );
            node.classList.add("way-card__item--selected");
            onWaySelected(ways[index]);
        });

        return node;
    });
};
