import { Button, Pane, SelectMenu } from "evergreen-ui";
import React from "react";
import { PayingPossibiltiesSelect, TabPane } from "shared/ui";
import { StaffLangsSelect } from "shared/ui/Inputs/StaffLangsSelect";

export const OtherInfo: React.FC = () => {
    const [selected, setSelected] = React.useState(null);

    return (
        <TabPane index={4} tab="Other Info">
            <Pane width="70%">
                <PayingPossibiltiesSelect />
                <StaffLangsSelect />
            </Pane>
        </TabPane>
    );
};
