import { Accept } from "../Accept";
import { Hide } from "../Hide";
import { Reject } from "../Reject";
import { Save } from "../Save";
import { SaveToDraft } from "../SaveToDraft";

export const statuses = {
    saveAndPublish: {
        Component: Save,
        permission: "resource.saveAndPublish",
    },
    saveToDraft: {
        Component: SaveToDraft,
        permission: "resource.saveToDraft",
    },
    hide: {
        Component: Hide,
        permission: "resource.hide",
    },
    accept: {
        Component: Accept,
        permission: "resource.accept",
    },
    reject: {
        Component: Reject,
        permission: "resource.reject",
    },
} as const;

export const statusesColors = {
    unprocessed: "blue",
    draft: "neutral",
    hidden: "yellow",
    accepted: "green",
    rejected: "red",
} as const;
