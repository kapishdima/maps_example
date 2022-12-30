import React from "react";
import { WayEditContent } from "features/Ways";
import { WayServiceProvider } from "processes/ways";

export const WayEditPage: React.FC = () => {
    return (
        <WayServiceProvider>
            <WayEditContent />
        </WayServiceProvider>
    );
};
