import { initRating } from "../../rating";
import { ellipsis } from "../../utils";
import { getTranslations } from "../utils";

export const wineryInfoWindowTemplate = (location) => {
    const translations = getTranslations();

    const node = new DOMParser().parseFromString(
        `<div class="hover-card" data-el="map-winery-card">
            <img class="hover-card__img" src="${
                location.entity.thumbnail_image?.path ||
                "/images/image-placeholder.png"
            }" alt="" >
            <div class="map-card__info">
                <h3 class="text--medium hover-card__name">${
                    location.entity.name
                }</h3>
                <div class="location__row">
                    <div class="location-rating" data-el="rating"></div>
                    <p class="hover-card__review location__rewiew">${
                        location.entity.reviews_count || 0
                    } rewiews</p>
                </div>
                <p class="hover-card__text">${ellipsis(
                    location.entity.description,
                    100
                )}</p>
                <a href="${
                    location.entity.url
                }" target="_blank" class="text--small map-card__link">${
            translations.more_details
        }</a>
            </div>
        </div>`,
        "text/html"
    );

    const ratingEl = node.querySelector('[data-el="rating"]');

    initRating(ratingEl, location.entity.rating || 0, 14, true);

    return node.body.children[0];
};

export const otherInfoWindowTemplate = (location) => `
    <div class="card-info" data-el="map-info-card">
        <h3 class="title--small card-info__title">${location.entity.name}</h3>
        <p class="text--regular">${location.entity.description}</p>
        <div class="text--regular card-info__row">
            <div>
                <svg class="feature-icon" width="18" height="16" viewBox="0 0 18 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.9798 9.83383C9.01326 9.83383 9.08689 9.82048 9.14044 9.75369C9.8767 8.87874 10.5126 8.03718 11.0413 7.25574L6.33594 6.46094C7.13914 7.81677 8.21007 9.07911 8.81916 9.75369C8.8727 9.82715 8.93964 9.83383 8.9798 9.83383Z"
                        fill="#525560" />
                    <path
                        d="M10.0656 10.5275C9.7979 10.8415 9.40969 11.0285 9.00139 11.0352C8.9947 11.0352 8.98801 11.0352 8.97462 11.0352C8.57302 11.0352 8.1915 10.8615 7.91708 10.5676C7.35484 9.94648 6.65204 9.10492 5.99609 8.16319V13.9806L11.9598 15.677V8.04297C11.3106 8.99139 10.6145 9.87301 10.0656 10.5275Z"
                        fill="#525560" />
                    <path
                        d="M4.18332 4.34766L0.394905 5.89051C0.160639 5.98402 0 6.21778 0 6.47158V15.0608C0 15.5617 0.508692 15.909 0.977225 15.722L4.93967 14.1324V6.41815C4.58492 5.73021 4.3105 5.02224 4.18332 4.34766Z"
                        fill="#525560" />
                    <path
                        d="M17.0511 4.03421L13.4635 5.39672C13.3431 5.69059 13.1958 5.99115 13.0352 6.29838V15.6823L17.6469 13.7855C17.861 13.6987 18.0016 13.485 18.0016 13.2512V4.68875C18.0016 4.20118 17.5063 3.86056 17.0511 4.03421Z"
                        fill="#525560" />
                    <path
                        d="M9.01893 0C6.97747 0 5.32422 1.64971 5.32422 3.68679C5.32422 5.67044 7.52632 8.47561 8.53032 9.65111C8.78466 9.94498 9.2465 9.9383 9.48746 9.63775C10.4781 8.38878 12.7203 5.39661 12.7203 3.68679C12.7136 1.64971 11.0604 0 9.01893 0ZM8.97208 5.02926C8.26259 5.02926 7.68696 4.45487 7.68696 3.7469C7.68696 3.03893 8.26259 2.46454 8.97208 2.46454C9.68157 2.46454 10.2572 3.03893 10.2572 3.7469C10.2572 4.45487 9.68157 5.02926 8.97208 5.02926Z"
                        fill="#525560" />
                </svg>
            </div>
            <span>${location.address}</span>
        </div>

        ${location.entity.contacts.map((contact) => {
            return `
                ${
                    contact.website &&
                    `
                    <div class="text--regular card-info__row">
                        <div>
                            <svg class="feature-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9 0C4.02849 0 0 4.0285 0 9C0 13.9715 4.02849 18 9 18C13.9715 18 18 13.9715 18 9C18 4.0285 13.9715 0 9 0ZM15.7293 6.91031C15.5029 6.8575 15.1861 6.79714 14.9598 6.7896C14.575 6.77451 14.5147 6.94049 14.3412 7.21207C14.1601 7.48366 13.6924 7.78541 13.1492 7.57418C12.606 7.36295 12.2816 7.2875 12.0629 7.544C11.8441 7.8005 11.8969 7.84577 12.1232 8.11735C12.3495 8.38894 13.202 9.0679 13.4208 9.55071C13.6396 10.0335 13.4208 10.5239 13.0285 10.7351C12.6362 10.9464 12.425 10.8935 12.3571 11.1048C12.2892 11.316 12.3722 11.8818 12.1987 12.4174C12.0251 12.9531 11.2028 13.979 10.8558 14.3261C10.5088 14.6731 9.76948 14.7033 9.46018 14.4996C9.15087 14.2959 8.92455 14.0997 8.92455 13.6094C8.92455 13.1115 8.96982 11.7008 8.86421 11.4971C8.75859 11.2934 8.66806 11.2179 7.82313 11.2179H7.03101C6.23135 11.2179 5.58257 10.5691 5.58257 9.76948V8.35122C5.58257 7.80805 5.83152 7.52137 6.48785 7.0461C7.14417 6.57083 7.76278 6.1031 8.04191 6.07292C8.32104 6.05029 8.87175 6.34451 9.64124 6.52556C10.4107 6.71417 11.5197 6.30679 11.9422 6.1031C12.3571 5.89941 12.3344 5.22045 12.0553 4.94887C11.7762 4.67728 10.7653 4.18692 10.6295 4.20955C10.4937 4.23219 10.2221 4.74518 9.70159 4.74518C9.18106 4.73763 8.71332 4.2171 8.38893 4.30763C8.06454 4.39815 7.75524 5.00922 7.40821 5.23554C7.06119 5.4694 6.5482 5.33361 6.60855 4.5264C6.6689 3.72674 6.66135 3.04778 6.55573 2.82146C6.49538 2.68566 6.3596 2.4518 6.26907 2.29338C6.21626 2.20285 6.25398 2.08969 6.34451 2.04442C9.20369 0.724223 14.3336 1.63705 15.9254 6.69153C15.9707 6.81978 15.8575 6.94049 15.7293 6.91031Z"
                                    fill="#525560" />
                            </svg>
                        </div>
                        <a href="${contact.website}">${ellipsis(
                        contact.website,
                        20
                    )}</a>
                    </div>
                `
                }
                ${
                    contact.telephone &&
                    contact.telephone
                        .split(";")
                        .map(
                            (telephone) => `
                        <div class="text--regular card-info__row">
                            <div>
                                <svg class="feature-icon" width="18" height="18" viewBox="0 0 18 18" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M9 0C4.0285 0 0 4.0285 0 9C0 13.9715 4.0285 18 9 18C13.9715 18 18 13.9715 18 9C18 4.0285 13.9715 0 9 0ZM9 4.51132C10.3655 4.51132 11.4669 5.61274 11.4669 6.97821C11.4669 8.34367 10.3655 9.4451 9 9.4451C7.63453 9.4451 6.53311 8.34367 6.53311 6.97821C6.53311 5.61274 7.64208 4.51132 9 4.51132ZM12.8022 13.1869H5.19782C4.88852 13.1869 4.63202 12.938 4.63202 12.6211C4.63202 11.565 5.48449 10.7125 6.54065 10.7125H11.4518C12.508 10.7125 13.3604 11.565 13.3604 12.6211C13.368 12.938 13.1115 13.1869 12.8022 13.1869Z"
                                        fill="#525560" />
                                </svg>
                            </div>
                            <a href="tel:${telephone}">${telephone}</a>
                        </div>
                    `
                        )
                        .join("\n")
                }
            `;
        })}
    </div>

`;
