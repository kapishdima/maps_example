import React, { useEffect } from "react";

import { Heading, majorScale, Pane } from "evergreen-ui";

import {
    SubmitButton,
    PasswordInput,
    TextInput,
    Logotype,
    Form,
} from "shared/ui";

import { loginSchema } from "./entity/validation/login";
import { useLogin } from "./hooks/useLogin";
import { useCommonData } from "app/hooks";
import { useMutation } from "react-query";

export const LoginPage: React.FC = () => {
    const { login, isLoading } = useLogin();
    const { clearCommonData } = useCommonData();

    useEffect(() => {
        clearCommonData();
    }, []);

    return (
        <Pane width="100vw" height="100vh" display="flex">
            <Pane
                width="50%"
                background="gray50"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderTopRightRadius={majorScale(4)}
                borderBottomRightRadius={majorScale(4)}
                boxShadow="11px 0px 28px -16px rgba(146, 155, 161, 0.2);"
            >
                <Logotype width="128px" />
            </Pane>
            <Pane
                width="50%"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Pane width="70%">
                    <Heading size={600} marginBottom={majorScale(3)}>
                        Sign In
                    </Heading>
                    <Form onSubmit={login} validationSchema={loginSchema}>
                        <TextInput name="email" label="Email" />
                        <PasswordInput name="password" label="Password" />
                        <SubmitButton isLoading={isLoading} text="Sign in" />
                    </Form>
                </Pane>
            </Pane>
        </Pane>
    );
};
