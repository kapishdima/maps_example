import React from "react";

import { toaster } from "evergreen-ui";

type ToastType = "success" | "danger" | "warning" | "notify";

type CreateNotificationOptions = {
    title: string;
    type: ToastType;
    description?: string;
    duration?: number;
};

export const createNotification = ({
    title,
    type,
    description,
    duration,
}: CreateNotificationOptions) => {
    if (!title || title === "" || !title.length) {
        return;
    }

    toaster[type](title, { description, duration });
};

export const createErrorNotification = (
    options: Omit<CreateNotificationOptions, "type">
) => {
    createNotification({ ...options, type: "danger" });
};

export const createSuccessNotification = (
    options: Omit<CreateNotificationOptions, "type">
) => {
    createNotification({ ...options, type: "success" });
};

export const createWarningNotification = (
    options: Omit<CreateNotificationOptions, "type">
) => {
    createNotification({ ...options, type: "warning" });
};

export const createInfoNotification = (
    options: Omit<CreateNotificationOptions, "type">
) => {
    createNotification({ ...options, type: "notify" });
};
