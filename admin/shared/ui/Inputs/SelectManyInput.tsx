import React, { useState } from "react";

import { majorScale, FormField, ErrorIcon, Heading } from "evergreen-ui";

import { Input } from "./Input";
import { Select, SelectProps } from "../Select/Select";
import { InputCoreProps } from "./types";
import { useControl } from "shared/hooks";

type SelectManyInputProps = SelectProps &
    InputCoreProps & {
        buttonText?: string;
        label?: string;
        required?: boolean;
    };

export const SelectManyInput: React.FC<SelectManyInputProps> = ({
    name,
    title,
    options,
    buttonText,
    label,
    required,
    ...props
}) => {
    const { setValue } = useControl();
    const [selected, setSelected] = useState([]);

    const onSelect = (value) => {
        setSelected((_selected) => {
            const updatedSelect = [..._selected, value];
            saveToForm(updatedSelect);
            return updatedSelect;
        });
    };

    const onDeselect = (value) => {
        setSelected((_selected) => {
            const updatedSelect = selected.filter(
                (selectedItem) => selectedItem !== value
            );
            saveToForm(updatedSelect);
            return updatedSelect;
        });
    };

    const getSelectedOption = (selectedItem) => {
        return options.find((option) => option.value === selectedItem)?.label;
    };

    const changeSelectName = (currentlySelected: any[]) => {
        const selectedLength = currentlySelected
            ? currentlySelected.length
            : selected.length;

        if (selectedLength === 0) {
            return buttonText || "Select...";
        }

        if (selectedLength === 1) {
            return getSelectedOption(currentlySelected[0] || selected[0]);
        }
        return currentlySelected.map(getSelectedOption).join(", ");
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
                            isMultiSelect
                            buttonText={buttonText}
                            statelessProps={{ style: { position: "absolute" } }}
                            closeOnSelect
                            title={title}
                            options={options}
                            selected={selected}
                            onDeselect={(item) => {
                                onDeselect(item.value);
                            }}
                            onSelect={(item) => {
                                onSelect(item.value);
                            }}
                            value={changeSelectName(field.value)}
                            {...props}
                        />
                    </FormField>
                );
            }}
        </Input>
    );
};
