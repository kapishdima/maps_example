import React, { useRef, useState } from "react";

import {
    Button,
    ButtonProps,
    Heading,
    majorScale,
    minorScale,
    Pane,
    SelectMenu as SelectUI,
    SelectMenuItem,
    SelectMenuProps,
} from "evergreen-ui";
import { FieldError } from "react-hook-form";

export type SelectUIProps = Omit<SelectMenuProps, "children" | "options">;
export type SelectOption = SelectMenuItem;

export type SelectProps = SelectUIProps & {
    value?: string;
    buttonText?: string;
    buttonProps?: Omit<ButtonProps, "children">;
    button?: JSX.Element;
    options: SelectMenuItem[];
    isInvalid?: boolean;
    error?: FieldError;
};

export const Select: React.FC<SelectProps> = ({
    value,
    buttonText,
    buttonProps,
    button,
    isInvalid,
    error,
    ...props
}) => {
    const buttonRef = useRef<HTMLButtonElement>();

    return (
        <SelectUI
            hasFilter={props.hasFilter}
            hasTitle={props.hasTitle}
            titleView={() => {
                return (
                    <Pane paddingX={majorScale(2)} paddingY={minorScale(3)}>
                        <Heading size={100}>{props.title}</Heading>
                    </Pane>
                );
            }}
            options={props.options}
            selected={props.selected}
            {...props}
        >
            {button ? (
                button
            ) : (
                <Button
                    ref={buttonRef}
                    type="button"
                    tabIndex={-1}
                    justifyContent="flex-start"
                    style={isInvalid ? { borderColor: "#D14343" } : null}
                    {...buttonProps}
                >
                    {value || buttonText || "Select..."}
                </Button>
            )}
        </SelectUI>
    );
};
