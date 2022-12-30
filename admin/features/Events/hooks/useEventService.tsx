import React from "react";
import { EventServiceContext } from "../providers/EventsServiceProvider";

export const useEventsService = () => {
    return React.useContext(EventServiceContext);
};
