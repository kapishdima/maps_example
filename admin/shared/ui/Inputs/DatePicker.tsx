import React from "react";
import DatePickerUI from "react-datepicker";

import { useControl } from "shared/hooks";
import { Input } from "./Input";

import "react-datepicker/dist/react-datepicker.css";
import { FormField, FormFieldProps, majorScale, TextInput } from "evergreen-ui";

type DatePickerProps = FormFieldProps & {
    name: string;
};

export const DatePicker: React.FC<DatePickerProps> = ({
    name,
    label,
    description,
    hint,
}) => {
    const { setValue } = useControl();

    return (
        <FormField
            label={label}
            description={description}
            hint={hint}
            marginBottom={majorScale(2)}
        >
            <Input name={name}>
                {({ field }) => (
                    <DatePickerUI
                        selected={
                            field.value ? new Date(field.value) : new Date()
                        }
                        onChange={(date) => {
                            setValue(name, date);
                        }}
                        customInput={<TextInput />}
                    />
                )}
            </Input>
        </FormField>
    );
};
