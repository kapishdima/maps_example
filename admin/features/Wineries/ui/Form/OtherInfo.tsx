import { Pane } from "evergreen-ui";
import React from "react";
import {
    GrapeVariatisSelect,
    PayingPossibiltiesSelect,
    TabPane,
    WineCategoriesSelect,
} from "shared/ui";
import { StaffLangsSelect } from "shared/ui/Inputs/StaffLangsSelect";
import { TourOptionsSelect } from "shared/ui/Inputs/TourOptionsSelect";

export const OtherInfo: React.FC = () => {
    return (
        <TabPane index={4} tab="Other Info">
            <Pane width="70%">
                <PayingPossibiltiesSelect />
                <StaffLangsSelect />
                <WineCategoriesSelect />
                <GrapeVariatisSelect />
                <TourOptionsSelect />
            </Pane>
        </TabPane>
    );
};
