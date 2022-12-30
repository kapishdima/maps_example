import React from "react";

import { Checkbox } from "evergreen-ui";
import { Input } from "../Input";

export const CheckboxInput = ({ name, label }) => {
    return (
        <Input name={name}>
            {({ field, fieldState }) => {
                return (
                    <Checkbox
                        label={label}
                        name={name}
                        checked={field.value}
                        onChange={field.onChange}
                        value={field.value}
                        isInvalid={fieldState.invalid}
                    />
                );
            }}
        </Input>
    );
};
