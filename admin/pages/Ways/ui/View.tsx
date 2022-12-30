import React from "react";
import { WayServiceProvider } from "processes/ways";
import { WaysViewContent } from "features/Ways";

export const WaysViewPage: React.FC = () => {
    return (
        <WayServiceProvider>
            <WaysViewContent />
        </WayServiceProvider>
    );
};
