import React from "react";
import { majorScale, Pane } from "evergreen-ui";
import {
    CountriesSelect,
    PasswordInput,
    SwitchInput,
    TabPane,
    TextInput,
} from "shared/ui";

export const MainInfo: React.FC = () => {
    return (
        <TabPane index={0} tab="Main Information">
            <Pane width="70%" marginTop={majorScale(4)}>
                <TextInput
                    name="name"
                    label="Name"
                    placeholder="Enter admin name..."
                />

                <TextInput
                    name="email"
                    label="Email"
                    placeholder="Enter admin email..."
                />

                <PasswordInput
                    name="password"
                    label="Password"
                    placeholder="Enter password..."
                />

                <PasswordInput
                    name="password_confirmation"
                    label="Password confirmation"
                    placeholder="Enter password..."
                />
                <SwitchInput name="isSuperAdmin" label="Is super admin?" />
                <CountriesSelect />
            </Pane>
        </TabPane>
    );
};
