export const waypointMarker = (
    order,
    fillColor = "#FFFFFF",
    strokeColor = "#202645",
    textColor = "#202645"
) => `
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.2095 16.0289C19.5712 20.5876 14.5475 22.9551 9.98881 21.3168C5.43008 19.6785 3.06261 14.6548 4.70091 10.0961C6.33922 5.53736 11.3629 3.16988 15.9216 4.80819C20.4804 6.44649 22.8478 11.4702 21.2095 16.0289Z" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2"/>
        <text x="50%" y="50%" text-anchor="middle" fill="${textColor}" font-size="10px" font-family="Noto Sans, Arial" font-weight="600" dy=".3em">${order}</text>
    </svg>
`;
