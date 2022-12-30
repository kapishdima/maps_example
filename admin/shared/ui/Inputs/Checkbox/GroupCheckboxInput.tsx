import React, { useState } from "react";

import { majorScale, FormField } from "evergreen-ui";
import { CheckboxInput } from "./CheckboxInput";

export const GroupCheckboxInput = ({ name, label, labels }) => {
    return (
        <FormField label={label} marginBottom={majorScale(3)}>
            {labels.map((label, index) => (
                <CheckboxInput
                    key={label}
                    label={label}
                    name={`${name}.${index}`}
                />
            ))}
        </FormField>
    );
};
