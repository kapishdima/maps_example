import React from "react";
import { WayCreateContent } from "features/Ways/";
import { WayServiceProvider } from "processes/ways";

export const WayCreatePage: React.FC = () => {
    return (
        <WayServiceProvider>
            <WayCreateContent />
        </WayServiceProvider>
    );
};
