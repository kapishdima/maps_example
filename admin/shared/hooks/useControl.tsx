import React from "react";
import { FormContext } from "shared/ui/Form/Form";

export const useControl = () => {
    const context = React.useContext(FormContext);

    if (!context) {
        throw new Error("useControl must be used within a Form");
    }
    return context;
};
