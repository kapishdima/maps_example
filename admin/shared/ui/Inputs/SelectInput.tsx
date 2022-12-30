import React, { useState } from "react";

import { majorScale, FormField, Heading, ErrorIcon } from "evergreen-ui";

import { Input } from "./Input";
import { Select, SelectProps } from "../Select/Select";
import { InputCoreProps } from "./types";
import { useControl } from "shared/hooks";

type SelectInputProps = SelectProps &
    InputCoreProps & {
        buttonText?: string;
        label?: string;
        required?: boolean;
    };

export const SelectInput: React.FC<SelectInputProps> = ({
    name,
    title,
    options,
    buttonText,
    label,
    required,
    ...props
}) => {
    const { setValue } = useControl();
    const [selected, setSelected] = useState(null);

    const getSelectedOption = (defaultSelected?: string) => {
        if (defaultSelected) {
            return options.find((option) => option.value === defaultSelected)
                ?.label;
        }
        return options.find((option) => option.value === selected)?.label;
    };

    const saveToForm = (value) => {
        setValue(name, value);
    };

    return (
        <Input name={name}>
            {({ field, fieldState }) => {
                const isInvalid = Boolean(fieldState.error);

                return (
                    <FormField
                        label={label}
                        isRequired={required}
                        hint={
                            fieldState.error ? (
                                <Heading
                                    size={200}
                                    color="#D14343"
                                    display="flex"
                                    alignItems="center"
                                    fontWeight={400}
                                    marginTop={majorScale(2)}
                                    columnGap={majorScale(1)}
                                >
                                    <ErrorIcon color="danger" />
                                    {fieldState.error?.message}
                                </Heading>
                            ) : null
                        }
                        display="flex"
                        flexDirection="column"
                        marginBottom={majorScale(3)}
                    >
                        <Select
                            isInvalid={isInvalid}
                            error={fieldState.error}
                            buttonText={buttonText}
                            closeOnSelect
                            title={title}
                            options={options}
                            selected={selected}
                            onSelect={(item) => {
                                setSelected(item.value);
                                saveToForm(item.value);
                            }}
                            value={getSelectedOption(field.value)}
                            {...props}
                        />
                    </FormField>
                );
            }}
        </Input>
    );
};
