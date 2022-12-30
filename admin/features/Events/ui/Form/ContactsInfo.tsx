import React from "react";

import { Pane, majorScale } from "evergreen-ui";
import {
    ArrayInput,
    TabPane,
    TextInput,
    TranslatableTextInput,
} from "shared/ui";
import { useControl } from "shared/hooks";

export const ContactsInfo: React.FC = () => {
    return (
        <TabPane index={1} tab="Contacts">
            <Pane width="50%" marginTop={majorScale(4)}>
                <ArrayInput
                    name="contacts"
                    title="Contact"
                    defaultValue={{
                        contact_person: "",
                        email: "",
                        telephone: "",
                        website: "",
                    }}
                >
                    {(_, index) => (
                        <Pane>
                            <TranslatableTextInput
                                label="Contact Person"
                                name={`contacts.${index}.contact_person`}
                                isInline
                            />
                            <TextInput
                                label="Email"
                                name={`contacts.${index}.email`}
                            />
                            <TextInput
                                label="Telephone"
                                name={`contacts.${index}.telephone`}
                            />
                            <TextInput
                                label="Website"
                                name={`contacts.${index}.website`}
                            />
                        </Pane>
                    )}
                </ArrayInput>
            </Pane>
        </TabPane>
    );
};
