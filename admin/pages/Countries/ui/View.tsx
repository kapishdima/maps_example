import React from "react";

import { Pane } from "evergreen-ui";

import {
    CountriesViewContent,
    CountriesServiceProvider,
} from "features/Countries";
import { Content, ContentHeader, CreateLink } from "shared/ui";

export const CountriesViewPage: React.FC = () => {
    return (
        <Content
            header={
                <ContentHeader
                    title="Countries Page"
                    hint="On this page you can see all information about countries in the form of a simple table"
                />
            }
        >
            <CountriesServiceProvider>
                <CountriesViewContent />
            </CountriesServiceProvider>
        </Content>
    );
};
