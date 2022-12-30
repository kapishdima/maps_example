import React from "react";

import { Switch, majorScale, FormField } from "evergreen-ui";
import { Input } from "./Input";

export const SwitchInput = ({ name, label }) => {
    return (
        <FormField label={label} marginBottom={majorScale(3)}>
            <Input name={name} defaultValue={false}>
                {({ field, fieldState }) => {
                    return (
                        <Switch
                            marginTop={majorScale(1)}
                            name={name}
                            value={field.value}
                            checked={field.value}
                            onChange={field.onChange}
                        />
                    );
                }}
            </Input>
        </FormField>
    );
};
