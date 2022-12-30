import React from "react";

import { Radio, majorScale, FormField } from "evergreen-ui";
import { Input } from "./Input";

export const RadioInput = ({ name, label, options }) => {
    return (
        <FormField label={label} marginBottom={majorScale(3)}>
            {options.map((option) => (
                <Input name={name} key={option.value}>
                    {({ field }) => {
                        return (
                            <Radio
                                ref={field.ref}
                                name={name}
                                label={option.value}
                                value={option.value}
                                onChange={(event) => {
                                    field.onChange({
                                        target: {
                                            name,
                                            value: event.target.value,
                                        },
                                    });
                                }}
                                onBlur={field.onBlur}
                            />
                        );
                    }}
                </Input>
            ))}
        </FormField>
    );
};
