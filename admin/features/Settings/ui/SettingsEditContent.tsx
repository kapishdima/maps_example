import React from "react";

import { useNavigate } from "react-router-dom";

import { Pane } from "evergreen-ui";
import { Content, ContentHeader, InlineStatus, Loading } from "shared/ui";
import { useGetResourceById } from "shared/hooks";

import { SettingsResponseEntity } from "entities/settings";

import { SettingsForm } from "./Form/SettingsForm";
import { useSettingsService } from "../hooks/useSettingsService";
import { SettingsHeading } from "./Form/SettingsHeading";
import { useUpdateSettings } from "../hooks/useUpdateSettings";
import { useLocationsService } from "processes/locations";

export const SettingsEditContent: React.FC = () => {
    const settingsService = useSettingsService();

    const { data: settings, isFetching } = useGetResourceById(
        "settings",
        async (id: string) => {
            const settings = await settingsService.getSettings(id);

            return settings;
        }
    );
    const { mutate: updateSettings, isLoading } = useUpdateSettings(
        (id: string, settings: SettingsResponseEntity) =>
            settingsService.updateSettings(id, settings)
    );

    if (isFetching) {
        return <Loading minWidth="100vw" minHeight="100vh" />;
    }

    return (
        <Content
            header={
                <ContentHeader
                    title={
                        <Pane display="flex" alignItems="center">
                            <SettingsHeading settings={settings} />
                        </Pane>
                    }
                    hasBackLink={false}
                />
            }
        >
            <SettingsForm
                onSubmit={updateSettings}
                defaultValue={settings}
                isLoading={isLoading}
            />
        </Content>
    );
};
