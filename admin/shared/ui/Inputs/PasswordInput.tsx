import React from "react";

import { TextInputFieldProps as TextInputUIProps } from "evergreen-ui";

import { InputCoreProps } from "./types";
import { TextInput } from "./TextInput";

type PasswordInputProps = TextInputUIProps & InputCoreProps & {};

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
    return <TextInput {...props} type="password" />;
};
